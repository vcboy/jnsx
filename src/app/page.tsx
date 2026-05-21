import Link from "next/link";
import { SchoolCard } from "@/components/SchoolCard";
import { getCategories, getCities, getFeaturedArticles, getProgramSummaries, getSchools } from "@/lib/data";

// Icons
function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function BookOpenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "健康服务": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  "交通与汽车": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>,
  "商贸服务": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  "数字技术": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  "现代服务": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>,
  "智能制造": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
};

export default function Home() {
  const schools = getSchools();
  const cities = getCities();
  const categories = getCategories();
  const articles = getFeaturedArticles();
  const programCount = getProgramSummaries().length;

  return (
    <main>
      {/* Hero Section */}
      <section className="shell hero">
        <div className="hero-content">
          <div className="eyebrow animate-on-load animate-fade-in-up">
            <MapPinIcon />
            <span>给中考后家庭的一张技能升学地图</span>
          </div>
          <h1 className="animate-on-load animate-fade-in-up delay-100">
            把分散难懂的技工院校信息整理成能核验的择校工具
          </h1>
          <p className="lead animate-on-load animate-fade-in-up delay-200" style={{margin: 0, fontSize: '15px', lineHeight: '1.65', color: 'var(--text-secondary)'}}>
            先从浙江技工院校库开始，按城市、专业、学制和来源状态筛选。每所学校都保留费用、专业、风险提示和来源核验入口，帮助家长少听口头承诺，多看公开材料。
          </p>
          <div className="hero-actions animate-on-load animate-fade-in-up delay-300">
            <Link href="/schools" className="button button-amber button-lg">
              <MapPinIcon />
              <span>开始找学校</span>
            </Link>
            <Link href="/articles" className="button button-lg button-secondary">
              <BookOpenIcon />
              <span>先读指南</span>
            </Link>
          </div>
          <div className="hero-stats animate-on-load animate-fade-in-up delay-400">
            <div className="stat">
              <div className="stat-icon stat-icon-primary">
                <GraduationCapIcon />
              </div>
              <div className="stat-content">
                <strong>{schools.length}</strong>
                <span>所样例学校档案</span>
              </div>
            </div>
            <div className="stat">
              <div className="stat-icon stat-icon-warning">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <div className="stat-content">
                <strong>{programCount}</strong>
                <span>个专业方向</span>
              </div>
            </div>
            <div className="stat">
              <div className="stat-icon stat-icon-success">
                <BookOpenIcon />
              </div>
              <div className="stat-content">
                <strong>10</strong>
                <span>篇家长解释指南</span>
              </div>
            </div>
          </div>
        </div>
        <aside className="hero-panel animate-on-load animate-slide-in-right delay-200">
          <div className="panel-header">
            <div className="panel-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h2>快速开始</h2>
          </div>
          <div className="route-stack">
            <Link className="route-card" href="/schools">
              <div className="route-icon route-icon-blue">
                <MapPinIcon />
              </div>
              <div className="route-content">
                <strong>按城市找学校</strong>
                <span>先看杭州、宁波、温州、金华、台州等地区可选项。</span>
              </div>
              <ChevronRightIcon />
            </Link>
            <Link className="route-card" href="/programs">
              <div className="route-icon route-icon-green">
                <GraduationCapIcon />
              </div>
              <div className="route-content">
                <strong>按专业找方向</strong>
                <span>理解新能源汽车、数控、电商、幼儿服务等专业到底学什么。</span>
              </div>
              <ChevronRightIcon />
            </Link>
            <Link className="route-card" href="/articles">
              <div className="route-icon route-icon-purple">
                <BookOpenIcon />
              </div>
              <div className="route-content">
                <strong>了解升学路径</strong>
                <span>读懂中技、高级工、预备技师和民办技校核验方法。</span>
              </div>
              <ChevronRightIcon />
            </Link>
          </div>
        </aside>
      </section>

      {/* Cities Section */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="section-head">
            <div className="section-title-group">
              <span className="section-eyebrow">按地区筛选</span>
              <h2>热门城市</h2>
            </div>
            <Link className="button button-secondary" href="/schools">
              <span>全部学校</span>
              <ArrowRightIcon />
            </Link>
          </div>
          <div className="cities-grid">
            {cities.map((city) => (
              <Link className="city-card" key={city} href={`/schools?city=${encodeURIComponent(city)}`}>
                <div className="city-icon">
                  <MapPinIcon />
                </div>
                <span className="city-name">{city}</span>
                <span className="city-arrow"><ChevronRightIcon /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div className="section-title-group">
              <span className="section-eyebrow">按兴趣筛选</span>
              <h2>专业方向</h2>
            </div>
            <Link className="button button-secondary" href="/programs">
              <span>查看专业解释</span>
              <ArrowRightIcon />
            </Link>
          </div>
          <div className="programs-grid">
            {categories.map((category) => (
              <Link className="program-card" key={category} href={`/schools?category=${encodeURIComponent(category)}`}>
                <div className="program-icon">{categoryIcons[category] || <GraduationCapIcon />}</div>
                <div className="program-content">
                  <h3>{category}</h3>
                  <p className="muted">查看开设该方向的学校与对应学制。</p>
                </div>
                <span className="program-arrow"><ChevronRightIcon /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="section-head">
            <div className="section-title-group">
              <span className="section-eyebrow">精选档案</span>
              <h2>样例学校</h2>
            </div>
            <Link className="button button-secondary" href="/schools">
              <span>进入学校库</span>
              <ArrowRightIcon />
            </Link>
          </div>
          <div className="school-list">
            {schools.slice(0, 3).map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div className="section-title-group">
              <span className="section-eyebrow">家长必读</span>
              <h2>升学指南</h2>
            </div>
            <Link className="button button-secondary" href="/articles">
              <span>全部文章</span>
              <ArrowRightIcon />
            </Link>
          </div>
          <div className="articles-grid">
            {articles.map((article) => (
              <Link className="article-card" key={article.slug} href={`/articles/${article.slug}`}>
                <div className="article-meta">
                  <span className="article-category">{article.category}</span>
                  <span className="article-date">{article.publishedAt}</span>
                </div>
                <h3>{article.title}</h3>
                <p className="muted">{article.summary}</p>
                <div className="article-footer">
                  <span className="article-link">
                    阅读全文
                    <ChevronRightIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
