"use client";

import Link from "next/link";
import { useState } from "react";
import { getCategories, getProgramSummaries } from "@/lib/data";
import { getCategoryConfig, getLevelConfig } from "@/lib/category-config";

// Icon components - defined inline to keep config file pure data
function HeartPulseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
      <circle cx="6.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  );
}

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function HexagonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// Map icon names to components
const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  "heart-pulse": HeartPulseIcon,
  "car": CarIcon,
  "shopping-bag": ShoppingBagIcon,
  "monitor": MonitorIcon,
  "layers": LayersIcon,
  "hexagon": HexagonIcon,
  "box": BoxIcon,
};

function getCategoryIconComponent(iconName: string): React.FC<{ className?: string }> {
  return iconComponents[iconName] || BoxIcon;
}

// Category filter button component
function CategoryFilterButton({
  category,
  count,
  isActive,
  onClick,
}: {
  category: string | null;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const config = category ? getCategoryConfig(category) : { icon: "box", bgColor: "#f3f4f6", iconColor: "#6b7280" };
  const IconComponent = getCategoryIconComponent(config.icon);

  return (
    <button
      className={`category-filter ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <span
        className="category-filter-icon"
        style={{
          background: isActive ? "rgba(255,255,255,0.2)" : config.bgColor,
          color: isActive ? "white" : config.iconColor,
        }}
      >
        <IconComponent className="w-4.5 h-4.5" />
      </span>
      <span>{category || "全部"}</span>
      <span className="category-count">{count}</span>
    </button>
  );
}

// Program card component
function ProgramCard({ summary }: { summary: ReturnType<typeof getProgramSummaries>[number] }) {
  const config = getCategoryConfig(summary.category);
  const IconComponent = getCategoryIconComponent(config.icon);
  const hasRisks = summary.guide?.riskNotes && summary.guide.riskNotes.length > 0;

  return (
    <Link className="program-detail-card" href={`/programs/${summary.slug}`}>
      {/* Card Header */}
      <div className="program-card-header" style={{ background: config.bgColor }}>
        <div className="program-card-icon" style={{ color: config.iconColor }}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="program-card-meta">
          <span className="program-category">{summary.category}</span>
          {hasRisks && (
            <span className="program-risk-badge">
              <AlertIcon className="w-3 h-3" />
              <span>有注意事项</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="program-card-body">
        <h3>{summary.name}</h3>

        {/* Levels */}
        <div className="program-levels">
          {summary.levels.map((level) => {
            const levelStyle = getLevelConfig(level);
            return (
              <span
                key={level}
                className="program-level-tag"
                style={{ background: levelStyle.bgColor, color: levelStyle.textColor }}
              >
                {level}
              </span>
            );
          })}
        </div>

        {/* Key Info */}
        <div className="program-key-info">
          <div className="key-info-item">
            <UsersIcon className="w-4 h-4" />
            <div className="key-info-content">
              <span className="key-info-label">开设学校</span>
              <span className="key-info-value">{summary.schoolCount} 所学校开设，2025 年计划 {summary.totalPlanCount} 人</span>
            </div>
          </div>
          <div className="key-info-item">
            <BriefcaseIcon className="w-4 h-4" />
            <div className="key-info-content">
              <span className="key-info-label">招收文化程度</span>
              <span className="key-info-value">{summary.cultureRequirements.slice(0, 3).join(" / ")}</span>
            </div>
          </div>
        </div>

        {/* Progression */}
        <div className="program-progression">
          <CheckIcon className="w-3.5 h-3.5" />
          <span>{summary.guide?.progression ?? "该专业来自2025年浙江省技工院校招生计划，详情页可查看关联学校和计划分布。"}</span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="program-card-footer">
        <span className="view-detail">
          查看专业详情
          <ChevronRightIcon className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

export default function ProgramsPage() {
  const summaries = getProgramSummaries();
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSummaries = selectedCategory
    ? summaries.filter((summary) => summary.category === selectedCategory)
    : summaries;

  return (
    <main>
      {/* Hero Section */}
      <section className="section">
        <div className="shell">
          <div className="page-header">
            <span className="page-eyebrow">专业库</span>
            <h1>先看懂专业，再比较学校</h1>
            <p className="page-lead">
              专业库已接入2025年浙江省技工院校招生计划，按专业名称汇总开设学校、招生人数、层次、学制和招收文化程度。
            </p>
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <div className="filter-label">
              <FilterIcon className="w-4 h-4" />
              <span>按分类筛选</span>
            </div>
            <div className="category-filters">
              <CategoryFilterButton
                category={null}
                count={summaries.length}
                isActive={selectedCategory === null}
                onClick={() => setSelectedCategory(null)}
              />
              {categories.map((category) => (
                <CategoryFilterButton
                  key={category}
                  category={category}
                  count={summaries.filter((summary) => summary.category === category).length}
                  isActive={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="programs-results">
            <div className="results-header">
              <span className="results-count">
                共 <strong>{filteredSummaries.length}</strong> 个官方计划专业
              </span>
              {selectedCategory && (
                <button className="clear-filter" onClick={() => setSelectedCategory(null)}>
                  清除筛选
                </button>
              )}
            </div>

            <div className="programs-grid-large">
              {filteredSummaries.map((summary) => (
                <ProgramCard key={summary.slug} summary={summary} />
              ))}
            </div>

            {filteredSummaries.length === 0 && (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="8" y1="8" x2="16" y2="16" />
                  <line x1="16" y1="8" x2="8" y2="16" />
                </svg>
                <p>该分类下暂无专业信息</p>
                <button className="button" onClick={() => setSelectedCategory(null)}>
                  查看全部专业
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
