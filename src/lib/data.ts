import { articles } from "@/data/articles";
import { programGuides, programs } from "@/data/programs";
import { schools } from "@/data/schools";
import { sources } from "@/data/sources";
import type { Program, ProgramLevel, ProgramSummary, SourceStatus } from "@/data/types";

export function getSchools() {
  return schools;
}

export function getSchool(id: string) {
  return schools.find((school) => school.id === id);
}

export function getProgramsBySchool(schoolId: string) {
  return programs.filter((program) => program.schoolId === schoolId);
}

export function getSourcesByTarget(targetId: string) {
  const matched = sources.filter((source) => source.targetId === targetId);
  return matched.length > 0 ? matched : sources.filter((source) => source.targetId === "all");
}

export function getSchoolProgramsSummary(schoolId: string) {
  return getProgramsBySchool(schoolId)
    .map((program) => program.name)
    .filter((value, index, array) => array.indexOf(value) === index);
}

export function getCities() {
  return [...new Set(schools.map((school) => school.city))].sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export function getCategories() {
  return [...new Set(programs.map((program) => program.category))].sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export function getLevels(): ProgramLevel[] {
  return [...new Set(programs.map((program) => program.level))].sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export function getStatuses(): SourceStatus[] {
  return ["已官方核验", "来自学校公开信息", "待核验"];
}

function programSlug(name: string) {
  return Array.from(name)
    .map((char) => char.charCodeAt(0).toString(16))
    .join("-");
}

function uniqueSorted<T extends string>(values: T[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function statusRank(status: SourceStatus) {
  return {
    "已官方核验": 0,
    "来自学校公开信息": 1,
    "待核验": 2
  }[status];
}

function bestStatus(records: Program[]): SourceStatus {
  return records.map((record) => record.sourceStatus).sort((a, b) => statusRank(a) - statusRank(b))[0] ?? "待核验";
}

export function getProgramSummaries(): ProgramSummary[] {
  const grouped = new Map<string, Program[]>();

  for (const program of programs) {
    const group = grouped.get(program.name) ?? [];
    group.push(program);
    grouped.set(program.name, group);
  }

  return [...grouped.entries()]
    .map(([name, records]) => {
      const guide = programGuides.find((item) => item.name === name);
      const schoolIds = uniqueSorted(records.map((record) => record.schoolId));
      const categories = records.map((record) => record.category);
      const category = guide?.category ?? categories.sort((a, b) => categories.filter((x) => x === b).length - categories.filter((x) => x === a).length)[0] ?? "其他方向";

      return {
        slug: programSlug(name),
        name,
        category,
        levels: uniqueSorted(records.map((record) => record.level)),
        cultureRequirements: uniqueSorted(records.map((record) => record.cultureRequirement ?? "待核验")),
        durations: uniqueSorted(records.map((record) => record.duration)),
        schoolIds,
        schoolCount: schoolIds.length,
        totalPlanCount: records.reduce((sum, record) => sum + (record.planCount ?? 0), 0),
        sourceStatus: bestStatus(records),
        sourceUrl: records.find((record) => record.sourceUrl)?.sourceUrl,
        guide
      };
    })
    .sort((a, b) => b.totalPlanCount - a.totalPlanCount || a.name.localeCompare(b.name, "zh-CN"));
}

export function getProgramSummary(slug: string) {
  return getProgramSummaries().find((summary) => summary.slug === slug);
}

export function getProgramRecordsByName(name: string) {
  return programs.filter((program) => program.name === name);
}

export function filterSchools(filters: {
  city?: string;
  ownership?: string;
  category?: string;
  level?: string;
  status?: string;
}) {
  return schools.filter((school) => {
    const schoolPrograms = getProgramsBySchool(school.id);
    const cityMatch = !filters.city || school.city === filters.city;
    const ownershipMatch = !filters.ownership || school.ownership === filters.ownership;
    const statusMatch = !filters.status || school.sourceStatus === filters.status;
    const categoryMatch = !filters.category || schoolPrograms.some((program) => program.category === filters.category);
    const levelMatch = !filters.level || schoolPrograms.some((program) => program.level === filters.level);

    return cityMatch && ownershipMatch && statusMatch && categoryMatch && levelMatch;
  });
}

export function getProgramGuides() {
  return programGuides;
}

export function getProgramGuide(slug: string) {
  return programGuides.find((guide) => guide.slug === slug);
}

export function getSchoolsByProgramName(name: string) {
  const ids = new Set(programs.filter((program) => program.name === name).map((program) => program.schoolId));
  return schools.filter((school) => ids.has(school.id));
}

export function getArticles() {
  return articles;
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleCategories() {
  return [...new Set(articles.map((article) => article.category))].sort();
}

export function getFeaturedArticles() {
  return articles.slice(0, 4);
}
