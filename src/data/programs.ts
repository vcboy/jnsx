import { officialPrograms2025 } from "./admissionPlan2025";
import type { ProgramGuide } from "./types";

export const programs = officialPrograms2025;

export const programGuides: ProgramGuide[] = [
  {
    slug: "new-energy-auto",
    name: "新能源汽车检测与维修",
    category: "交通与汽车",
    levels: ["中技", "高级工"],
    learnWhat: "学习车辆结构、电池与电控基础、检测设备使用、常见故障诊断和维修流程。",
    suitedFor: "适合动手能力较强、愿意进入汽修服务或新能源售后体系的学生。",
    progression: "可继续走高级工、预备技师或相关高职方向，具体以当年升学政策为准。",
    jobs: "面向汽车售后、检测维修、门店服务和设备维护等岗位。",
    riskNotes: ["不要只看“新能源”热词，要核验实训车辆、设备和师资。"]
  },
  {
    slug: "cnc",
    name: "数控加工",
    category: "智能制造",
    levels: ["中技", "高级工", "预备技师"],
    learnWhat: "学习机械识图、加工工艺、数控机床操作、编程基础和质量检测。",
    suitedFor: "适合能接受车间实训、对机械制造有耐心的学生。",
    progression: "可向智能制造、机械设计制造、机电一体化等方向继续升学。",
    jobs: "面向数控操作、工艺辅助、设备维护和生产管理基础岗位。",
    riskNotes: ["需确认实训课比例和设备数量，避免只停留在理论课程。"]
  },
  {
    slug: "robotics",
    name: "工业机器人应用与维护",
    category: "智能制造",
    levels: ["高级工", "预备技师"],
    learnWhat: "学习电气控制、PLC、机器人工作站操作、调试维护和生产线基础。",
    suitedFor: "适合数学和动手基础较好、愿意长期学习设备调试的学生。",
    progression: "可衔接智能制造、自动化、机电类高职专业。",
    jobs: "面向自动化产线维护、机器人操作、设备调试助理等岗位。",
    riskNotes: ["机器人专业容易被包装，应核验是否有真实工作站和企业实践。"]
  },
  {
    slug: "ecommerce",
    name: "电子商务",
    category: "商贸服务",
    levels: ["中技", "高级工"],
    learnWhat: "学习商品上架、客服、视觉基础、短视频运营、数据分析和平台规则。",
    suitedFor: "适合表达能力较好、愿意做运营执行和服务沟通的学生。",
    progression: "可向电子商务、市场营销、数字媒体等高职方向继续升学。",
    jobs: "面向客服、运营助理、直播助理、内容编辑等岗位。",
    riskNotes: ["警惕把流量故事当就业保障，重点看课程和实训项目。"]
  },
  {
    slug: "cooking",
    name: "烹饪",
    category: "现代服务",
    levels: ["中技", "高级工"],
    learnWhat: "学习基础刀工、热菜、面点、食品安全、厨房管理和餐饮服务流程。",
    suitedFor: "适合愿意长期训练手艺、能接受服务业作息的学生。",
    progression: "可继续走餐饮管理、酒店管理、食品相关方向。",
    jobs: "面向餐饮后厨、面点、配餐、酒店餐饮等岗位。",
    riskNotes: ["需要了解耗材费、实训安排和实习地点。"]
  },
  {
    slug: "childcare-service",
    name: "幼儿教育相关服务方向",
    category: "现代服务",
    levels: ["中技"],
    learnWhat: "学习幼儿照护、活动组织、基础艺术、沟通和保育服务知识。",
    suitedFor: "适合有耐心、表达稳定、愿意从事照护和服务工作的学生。",
    progression: "升学方向需重点核验，不应把专业名称等同于教师资格。",
    jobs: "面向托育、早教助理、保育相关服务岗位。",
    riskNotes: ["需核验证书、升学路径和就业岗位边界，避免误解为直接成为教师。"]
  }
];
