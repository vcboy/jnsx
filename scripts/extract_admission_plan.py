from __future__ import annotations

import json
import re
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "data-sources" / "zhejiang-2025-tech-school-admission-plan.pdf"
TXT_PATH = ROOT / "data-sources" / "zhejiang-2025-tech-school-admission-plan.txt"
OUT_PATH = ROOT / "src" / "data" / "admissionPlan2025.ts"
SUMMARY_PATH = ROOT / "data-sources" / "zhejiang-2025-tech-school-admission-plan.summary.json"

SOURCE_URL = "https://file.m12333.cn/upfile/download/d65cdfb1-2254-bb00-57dd-006dc216736f.pdf"
SOURCE_NAME = "浙江省人力资源和社会保障厅办公室关于公布2025年全省技工院校招生计划的通知"
SOURCE_DATE = "2025-05-07"
VERIFY_DATE = "2026-05-18"

HEADER_LINES = {
    "2025 年全省技工院校招生计划",
    "学校及专业",
    "培养层次",
    "招收文化",
    "程度",
    "学制",
    "(年)",
    "计划",
    "人数",
    "（人）",
    "生源分布",
}

LEVELS = {"技师", "预备技师", "高级", "中级"}
LEVELS_BY_LENGTH = sorted(LEVELS, key=len, reverse=True)
CITY_DISTRIBUTION_RE = re.compile(r"(杭州|宁波|温州|湖州|嘉兴|绍兴|金华|衢州|舟山|台州|丽水|省外)\d")


def extract_text() -> str:
    doc = fitz.open(PDF_PATH)
    text = "\n".join(page.get_text("text") for page in doc)
    TXT_PATH.write_text(text, encoding="utf-8")
    return text


def clean_lines(text: str) -> list[str]:
    lines: list[str] = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line in HEADER_LINES:
            continue
        if line.startswith("—") and line.endswith("—"):
            continue
        lines.append(line)
    return lines


def parse_school(line: str) -> tuple[str, str] | None:
    marker = "（招生电话："
    if marker in line and line.endswith("）"):
        name, phone = line.split(marker, 1)
        return name.strip(), phone[:-1].strip()
    return None


def split_inline_level(line: str) -> tuple[str, str] | None:
    for level in LEVELS_BY_LENGTH:
        if line.endswith(level) and line != level:
            name = line[: -len(level)].strip()
            if name:
                return name, level
    return None


def parse_record_header(lines: list[str], index: int) -> dict | None:
    for level_index in range(index, min(index + 4, len(lines))):
        line = lines[level_index]
        inline = split_inline_level(line)
        if line in LEVELS:
            level = line
            name_parts = lines[index:level_index]
        elif inline:
            level = inline[1]
            name_parts = lines[index:level_index] + [inline[0]]
        else:
            continue

        if not name_parts:
            continue
        if any("招生电话" in part or "，" in part or "省外" in part or CITY_DISTRIBUTION_RE.search(part) for part in name_parts):
            continue

        duration_index = level_index + 1
        while duration_index < min(level_index + 5, len(lines)):
            if lines[duration_index].endswith("年") and duration_index + 1 < len(lines) and lines[duration_index + 1].isdigit():
                return {
                    "name": "".join(name_parts),
                    "level": level,
                    "culture": "".join(lines[level_index + 1 : duration_index]),
                    "duration": lines[duration_index],
                    "count": int(lines[duration_index + 1]),
                    "nextIndex": duration_index + 2,
                }
            duration_index += 1

    return None


def category_for(program_name: str) -> str:
    rules = [
        ("交通与汽车", ["汽车", "新能源", "公路", "筑路", "交通", "飞机", "无人机"]),
        ("智能制造", ["数控", "机电", "机器人", "智能制造", "机械", "模具", "电气", "焊接", "工业互联网"]),
        ("数字技术", ["计算机", "软件", "网络", "物联网", "数字媒体", "信息安全", "人工智能", "多媒体"]),
        ("商贸服务", ["电子商务", "物流", "会计", "商务", "市场营销", "国际贸易", "直播"]),
        ("现代服务", ["烹饪", "酒店", "旅游", "美容", "美发", "形象设计", "幼儿", "护理", "健康", "家政"]),
        ("文化艺术", ["艺术", "设计", "音乐", "美术", "动漫", "摄影", "服装"]),
        ("农业与生态", ["园林", "农业", "茶", "畜牧", "生态", "环境"]),
    ]
    for category, keywords in rules:
        if any(keyword in program_name for keyword in keywords):
            return category
    return "其他方向"


def normalize_id(prefix: str, number: int) -> str:
    return f"{prefix}-{number:03d}"


def infer_city(name: str, phone: str) -> str:
    area_codes = {
        "0571": "杭州",
        "0574": "宁波",
        "0577": "温州",
        "0572": "湖州",
        "0573": "嘉兴",
        "0575": "绍兴",
        "0579": "金华",
        "0570": "衢州",
        "0580": "舟山",
        "0576": "台州",
        "0578": "丽水",
    }
    for code, city in area_codes.items():
        if phone.startswith(code):
            return city
    for city in area_codes.values():
        if city in name:
            return city
    return "待核验"


def infer_school_nature(name: str) -> str:
    if "技师学院" in name:
        return "技师学院"
    if "高级技工学校" in name:
        return "高级技工学校"
    if "技工学校" in name:
        return "技工学校"
    return "技工院校"


def parse_plan(lines: list[str]) -> tuple[list[dict], list[dict]]:
    schools: list[dict] = []
    programs: list[dict] = []
    current_school: dict | None = None
    i = 0

    while i < len(lines):
        school_match = parse_school(lines[i])
        if school_match and i + 1 < len(lines) and lines[i + 1].isdigit():
            school_number = len(schools) + 1
            school_id = normalize_id("school", school_number)
            current_school = {
                "id": school_id,
                "name": school_match[0],
                "phone": school_match[1],
                "total": int(lines[i + 1]),
            }
            schools.append(current_school)
            i += 2
            continue

        header = parse_record_header(lines, i) if current_school else None
        if current_school and header:
            program_name = header["name"]
            level = header["level"]
            culture = header["culture"]
            duration = header["duration"]
            count = header["count"]
            j = header["nextIndex"]
            distribution: list[str] = []

            while j < len(lines):
                next_school = parse_school(lines[j])
                if next_school and j + 1 < len(lines) and lines[j + 1].isdigit():
                    break
                if parse_record_header(lines, j):
                    break
                distribution.append(lines[j])
                j += 1

            programs.append(
                {
                    "id": f"program-{len(programs) + 1:04d}",
                    "schoolId": current_school["id"],
                    "schoolName": current_school["name"],
                    "admissionPhone": current_school["phone"],
                    "name": program_name,
                    "category": category_for(program_name),
                    "level": level,
                    "cultureRequirement": culture,
                    "duration": duration,
                    "planYear": 2025,
                    "planCount": count,
                    "tuition": "以学校当年公开收费材料为准",
                    "sourceDistribution": " ".join(distribution),
                    "sourceStatus": "已官方核验",
                    "sourceUrl": SOURCE_URL,
                }
            )
            i = j
            continue

        i += 1

    return schools, programs


def school_to_ts(school: dict) -> dict:
    city = infer_city(school["name"], school["phone"])
    return {
        "id": school["id"],
        "name": school["name"],
        "city": city,
        "district": "待核验",
        "ownership": "待核验",
        "schoolNature": infer_school_nature(school["name"]),
        "supervisingDepartment": "浙江省人力资源和社会保障系统",
        "address": "待核验",
        "phone": school["phone"],
        "admissionPhone": school["phone"],
        "summary": f"{school['name']}已列入2025年浙江省技工院校招生计划，计划招生{school['total']}人。",
        "fitTags": ["2025招生计划内", "全日制招生资质", "学校性质待补充"],
        "riskNotes": [
            "学校地址、收费、住宿和具体报名安排仍需以学校当年公开材料核验。",
            "本档案仅整理招生计划信息，不代表录取或就业承诺。",
        ],
        "plannedEnrollmentTotal": school["total"],
        "officialPlanYear": 2025,
        "sourceStatus": "已官方核验",
        "lastVerifiedAt": VERIFY_DATE,
    }


def write_ts(schools: list[dict], programs: list[dict]) -> None:
    school_objects = [school_to_ts(school) for school in schools]
    ts = "\n".join(
        [
            'import type { Program, School, Source } from "./types";',
            "",
            f'export const admissionPlan2025SourceUrl = "{SOURCE_URL}";',
            "",
            "export const admissionPlan2025Source: Source = "
            + json.dumps(
                {
                    "id": "zhejiang-2025-tech-admission-plan",
                    "targetType": "program",
                    "targetId": "all",
                    "sourceName": SOURCE_NAME,
                    "sourceUrl": SOURCE_URL,
                    "sourceType": "官方文件",
                    "verifiedAt": VERIFY_DATE,
                    "status": "已官方核验",
                },
                ensure_ascii=False,
                indent=2,
            )
            + ";",
            "",
            "export const officialSchools2025: School[] = "
            + json.dumps(school_objects, ensure_ascii=False, indent=2)
            + ";",
            "",
            "export const officialPrograms2025: Program[] = "
            + json.dumps(programs, ensure_ascii=False, indent=2)
            + ";",
            "",
        ]
    )
    OUT_PATH.write_text(ts, encoding="utf-8")


def main() -> None:
    text = extract_text()
    schools, programs = parse_plan(clean_lines(text))
    totals = {school["id"]: 0 for school in schools}
    for program in programs:
        totals[program["schoolId"]] += program["planCount"]

    mismatches = [
        {
            "school": school["name"],
            "declared": school["total"],
            "parsed": totals[school["id"]],
        }
        for school in schools
        if totals[school["id"]] != school["total"]
    ]

    if len(schools) != 97:
        raise SystemExit(f"Expected 97 schools, parsed {len(schools)}")
    if mismatches:
        raise SystemExit(f"School total mismatches: {mismatches[:10]}")

    write_ts(schools, programs)
    SUMMARY_PATH.write_text(
        json.dumps(
            {
                "source": SOURCE_NAME,
                "sourceUrl": SOURCE_URL,
                "sourceDate": SOURCE_DATE,
                "schools": len(schools),
                "programs": len(programs),
                "totalPlanCount": sum(program["planCount"] for program in programs),
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"schools={len(schools)} programs={len(programs)} total={sum(p['planCount'] for p in programs)}")


if __name__ == "__main__":
    main()
