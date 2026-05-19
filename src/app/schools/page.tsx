import { SchoolCard } from "@/components/SchoolCard";
import { SchoolFilters } from "@/components/SchoolFilters";
import { filterSchools } from "@/lib/data";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function pick(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SchoolsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const selected = {
    city: pick(params.city),
    ownership: pick(params.ownership),
    category: pick(params.category),
    level: pick(params.level),
    status: pick(params.status)
  };
  const results = filterSchools(selected);

  return (
    <main className="shell section">
      <div className="section-head">
        <div>
          <div className="eyebrow">学校库</div>
          <h1>按地区、专业和来源状态筛选</h1>
        </div>
        <p className="muted">共 {results.length} 所匹配学校</p>
      </div>
      <SchoolFilters selected={selected} />
      <div className="school-list">
        {results.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
      {results.length === 0 ? (
        <div className="info-panel">
          <h3>暂无匹配学校</h3>
          <p className="muted">可以减少筛选条件，或等待后续补充完整数据。</p>
        </div>
      ) : null}
    </main>
  );
}
