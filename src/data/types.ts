export type SourceStatus = "已官方核验" | "来自学校公开信息" | "待核验";

export type Ownership = "公办" | "民办" | "待核验";

export type ProgramLevel = "技师" | "预备技师" | "高级" | "中级" | "中技" | "高级工" | "中高职一体化" | "其他";

export type SourceType = "官方文件" | "学校官网" | "招生简章" | "公众号" | "待核验";

export interface School {
  id: string;
  name: string;
  city: string;
  district: string;
  ownership: Ownership;
  schoolNature: string;
  supervisingDepartment: string;
  address: string;
  phone: string;
  website?: string;
  officialAccount?: string;
  summary: string;
  fitTags: string[];
  riskNotes: string[];
  admissionPhone?: string;
  plannedEnrollmentTotal?: number;
  officialPlanYear?: number;
  sourceStatus: SourceStatus;
  lastVerifiedAt: string;
}

export interface Program {
  id: string;
  schoolId: string;
  schoolName?: string;
  name: string;
  category: string;
  level: ProgramLevel;
  cultureRequirement?: string;
  duration: string;
  planYear: number;
  planCount?: number;
  tuition: string;
  sourceDistribution?: string;
  admissionPhone?: string;
  sourceStatus: SourceStatus;
  sourceUrl?: string;
}

export interface ProgramGuide {
  slug: string;
  name: string;
  category: string;
  levels: ProgramLevel[];
  learnWhat: string;
  suitedFor: string;
  progression: string;
  jobs: string;
  riskNotes: string[];
}

export interface ProgramSummary {
  slug: string;
  name: string;
  category: string;
  levels: ProgramLevel[];
  cultureRequirements: string[];
  durations: string[];
  schoolIds: string[];
  schoolCount: number;
  totalPlanCount: number;
  sourceStatus: SourceStatus;
  sourceUrl?: string;
  guide?: ProgramGuide;
}

export interface Source {
  id: string;
  targetType: "school" | "program" | "fee" | "article";
  targetId: string;
  sourceName: string;
  sourceUrl?: string;
  sourceType: SourceType;
  verifiedAt: string;
  status: SourceStatus;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string[];
  publishedAt: string;
  updatedAt: string;
}
