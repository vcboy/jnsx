import type { SourceStatus } from "@/data/types";

const statusClass: Record<SourceStatus, string> = {
  已官方核验: "verified",
  来自学校公开信息: "school",
  待核验: "pending"
};

const statusLabel: Record<SourceStatus, string> = {
  已官方核验: "已核验",
  来自学校公开信息: "学校公开",
  待核验: "待核验"
};

export function StatusBadge({ status }: { status: SourceStatus }) {
  return <span className={`badge ${statusClass[status]}`}>{statusLabel[status]}</span>;
}
