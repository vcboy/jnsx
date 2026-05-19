import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { getProgramsBySchool, getSchool, getSchools, getSourcesByTarget } from "@/lib/data";

export function generateStaticParams() {
  return getSchools().map((school) => ({ id: school.id }));
}

export default async function SchoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const school = getSchool(id);

  if (!school) {
    notFound();
  }

  const programs = getProgramsBySchool(school.id);
  const sources = getSourcesByTarget(school.id);

  return (
    <main>
      <section className="detail-hero">
        <div className="shell">
          <div className="eyebrow">{school.city} · {school.schoolNature}</div>
          <h1>{school.name}</h1>
          <div className="meta">
            <span>{school.ownership}</span>
            <span>{school.district}</span>
            <span>更新：{school.lastVerifiedAt}</span>
            <StatusBadge status={school.sourceStatus} />
          </div>
        </div>
      </section>

      <div className="shell detail-layout">
        <div className="stack">
          <section className="info-panel">
            <h2>学校概览</h2>
            <p className="lead">{school.summary}</p>
            <div className="chips">
              {school.fitTags.map((tag) => (
                <span className="chip" key={tag}>{tag}</span>
              ))}
            </div>
          </section>

          <section className="info-panel">
            <h2>招生专业与计划</h2>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>专业</th>
                    <th>方向</th>
                    <th>层次</th>
                    <th>招收文化程度</th>
                    <th>学制</th>
                    <th>计划人数</th>
                    <th>费用</th>
                    <th>生源分布</th>
                    <th>来源</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program) => (
                    <tr key={program.id}>
                      <td data-label="专业">{program.name}</td>
                      <td data-label="方向">{program.category}</td>
                      <td data-label="层次">{program.level}</td>
                      <td data-label="招收文化程度">{program.cultureRequirement ?? "待核验"}</td>
                      <td data-label="学制">{program.duration}</td>
                      <td data-label="计划人数">{program.planCount ?? "待核验"}</td>
                      <td data-label="费用">{program.tuition}</td>
                      <td data-label="生源分布">{program.sourceDistribution ?? "待核验"}</td>
                      <td data-label="来源"><StatusBadge status={program.sourceStatus} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="info-panel">
            <h2>费用与风险提示</h2>
            <p className="muted">
              {school.ownership === "民办"
                ? "民办学校需重点核验学费、住宿费、代管费、退费规则和收款主体。"
                : "费用以当年公开收费材料为准，跨校区、住宿和耗材费用仍需逐项确认。"}
            </p>
            <ul>
              {school.riskNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="stack">
          <section className="info-panel">
            <h3>基本信息</h3>
            {school.plannedEnrollmentTotal ? <p><strong>2025计划：</strong>{school.plannedEnrollmentTotal} 人</p> : null}
            <p><strong>主管部门：</strong>{school.supervisingDepartment}</p>
            <p><strong>地址：</strong>{school.address}</p>
            <p><strong>电话：</strong>{school.phone}</p>
            {school.website ? <p><strong>网站：</strong><a href={school.website}>{school.website}</a></p> : null}
            {school.officialAccount ? <p><strong>公众号：</strong>{school.officialAccount}</p> : null}
          </section>

          <section className="info-panel">
            <h3>我要核验</h3>
            <p className="muted">优先核对公开文件、学校公开渠道和属地主管部门信息。</p>
            <div className="stack">
              {sources.length > 0 ? sources.map((source) => (
                <div key={source.id}>
                  <StatusBadge status={source.status} />
                  <p style={{ margin: "8px 0 0" }}>
                    {source.sourceUrl ? <a href={source.sourceUrl}>{source.sourceName}</a> : source.sourceName}
                  </p>
                  <p className="muted">{source.sourceType} · {source.verifiedAt}</p>
                </div>
              )) : (
                <p className="muted">暂无可展示来源，当前档案标记为待核验。</p>
              )}
            </div>
          </section>

          <Link className="button" href="/schools">返回学校库</Link>
        </aside>
      </div>
    </main>
  );
}
