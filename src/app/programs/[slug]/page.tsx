import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { getProgramRecordsByName, getProgramSummaries, getProgramSummary, getSchoolsByProgramName } from "@/lib/data";
import { getCategoryConfig, getLevelConfig } from "@/lib/category-config";

// Icons
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
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

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
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

function AlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function SchoolIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function generateStaticParams() {
  return getProgramSummaries().map((summary) => ({ slug: summary.slug }));
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const summary = getProgramSummary(slug);

  if (!summary) {
    notFound();
  }

  const records = getProgramRecordsByName(summary.name);
  const relatedSchools = getSchoolsByProgramName(summary.name);
  const categoryConfig = getCategoryConfig(summary.category);
  const guide = summary.guide;

  return (
    <main>
      {/* Back Navigation */}
      <div className="shell back-nav">
        <Link href="/programs" className="back-link">
          <ArrowLeftIcon className="w-4 h-4" />
          <span>返回专业列表</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="detail-hero" style={{ background: `linear-gradient(135deg, ${categoryConfig.bgColor} 0%, #ffffff 100%)` }}>
        <div className="shell">
          <div className="detail-hero-content">
            {/* Category Badge */}
            <div className="detail-category-badge">
              <span
                className="detail-category-dot"
                style={{ background: categoryConfig.iconColor }}
              />
              <span>{summary.category}</span>
            </div>

            {/* Title */}
            <h1>{summary.name}</h1>

            {/* Level Tags */}
            <div className="detail-level-tags">
              {summary.levels.map((level) => {
                const levelStyle = getLevelConfig(level);
                return (
                  <span
                    key={level}
                    className="detail-level-tag"
                    style={{ background: levelStyle.bgColor, color: levelStyle.textColor }}
                  >
                    {level}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="shell detail-layout">
        {/* Left Column - Main Info */}
        <div className="detail-main">
          {/* What to Learn */}
          <section className="detail-section">
            <div className="detail-section-header">
              <BookOpenIcon className="w-5 h-5" />
              <h2>官方计划概况</h2>
            </div>
            <div className="detail-section-body">
              <div className="detail-info-grid">
                <div className="detail-info-item">
                  <span className="detail-info-label">开设学校</span>
                  <p>{summary.schoolCount} 所</p>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">2025计划人数</span>
                  <p>{summary.totalPlanCount} 人</p>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">招收文化程度</span>
                  <p>{summary.cultureRequirements.join(" / ")}</p>
                </div>
                <div className="detail-info-item">
                  <span className="detail-info-label">学制</span>
                  <p>{summary.durations.join(" / ")}</p>
                </div>
              </div>
            </div>
          </section>

          {guide ? (
            <section className="detail-section">
              <div className="detail-section-header">
                <UsersIcon className="w-5 h-5" />
                <h2>专业补充解读</h2>
              </div>
              <div className="detail-section-body">
                <p><strong>学什么：</strong>{guide.learnWhat}</p>
                <p><strong>适合学生：</strong>{guide.suitedFor}</p>
              </div>
            </section>
          ) : null}

          <section className="detail-section">
            <div className="detail-section-header">
              <GraduationCapIcon className="w-5 h-5" />
              <h2>招生计划明细</h2>
            </div>
            <div className="detail-section-body">
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>学校</th>
                      <th>层次</th>
                      <th>招收文化程度</th>
                      <th>学制</th>
                      <th>计划人数</th>
                      {/* <th>生源分布</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id}>
                        <td data-label="学校">{record.schoolName}</td>
                        <td data-label="层次">{record.level}</td>
                        <td data-label="招收文化程度">{record.cultureRequirement ?? "待核验"}</td>
                        <td data-label="学制">{record.duration}</td>
                        <td data-label="计划人数">{record.planCount ?? "待核验"}</td>
                        {/* <td data-label="生源分布">{record.sourceDistribution ?? "待核验"}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Risk Notes */}
          {guide?.riskNotes && guide.riskNotes.length > 0 && (
            <section className="detail-section detail-section-warning">
              <div className="detail-section-header">
                <AlertTriangleIcon className="w-5 h-5" />
                <h2>注意事项</h2>
              </div>
              <div className="detail-section-body">
                <ul className="detail-risk-list">
                  {guide.riskNotes.map((note, index) => (
                    <li key={index}>
                      <span className="detail-risk-number">{index + 1}</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <aside className="detail-sidebar">
          {/* Related Schools */}
          <div className="detail-sidebar-section">
            <div className="detail-sidebar-header">
              <SchoolIcon className="w-5 h-5" />
              <h3>开设该专业的学校</h3>
            </div>
            <div className="detail-sidebar-body">
              <StatusBadge status={summary.sourceStatus} />
              {relatedSchools.length > 0 ? (
                <div className="detail-schools-list">
                  {relatedSchools.slice(0, 12).map((school) => (
                    <div key={school.id} className="detail-school-mini">
                      <div className="detail-school-name">
                        <Link href={`/schools/${school.id}`}>{school.name}</Link>
                      </div>
                      <div className="detail-school-meta">
                        <span>{school.city}</span>
                        <span>·</span>
                        <span>{school.ownership}</span>
                      </div>
                    </div>
                  ))}
                  {relatedSchools.length > 12 && (
                    <div className="detail-schools-more">
                      <span>还有 {relatedSchools.length - 12} 所学校...</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="detail-sidebar-empty">
                  暂无样例数据关联该专业
                </p>
              )}
              <Link href="/schools" className="button button-secondary button-full">
                查看全部学校
              </Link>
              {summary.sourceUrl ? (
                <a href={summary.sourceUrl} className="button button-secondary button-full">
                  查看来源PDF
                </a>
              ) : null}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="detail-sidebar-section detail-sidebar-actions">
            <Link href="/programs" className="button button-secondary button-full">
              <ArrowLeftIcon className="w-4 h-4" />
              <span>返回专业列表</span>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
