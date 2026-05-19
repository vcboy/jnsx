import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/data";
import { getCategoryConfig } from "@/lib/category-config";

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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
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

// Category config
const categoryConfig: Record<string, { color: string; bg: string }> = {
  "路径解释": { color: "#2563eb", bg: "#eff6ff" },
  "避坑核验": { color: "#dc2626", bg: "#fef2f2" },
  "费用说明": { color: "#059669", bg: "#f0fdf4" },
  "升学政策": { color: "#7c3aed", bg: "#f5f3ff" },
};

const defaultCategoryConfig = { color: "#6b7280", bg: "#f3f4f6" };

function getCategoryStyle(category: string) {
  return categoryConfig[category] || defaultCategoryConfig;
}

// Estimate reading time
function getReadingTime(content: string[]) {
  const wordsPerMinute = 300;
  const totalWords = content.join(" ").length;
  return Math.ceil(totalWords / wordsPerMinute);
}

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const categoryStyle = getCategoryStyle(article.category);
  const readingTime = getReadingTime(article.content);

  // Get related articles (same category, excluding current)
  const relatedArticles = getArticles()
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <main>
      {/* Back Navigation */}
      <div className="shell back-nav">
        <Link href="/articles" className="back-link">
          <ArrowLeftIcon className="w-4 h-4" />
          <span>返回指南列表</span>
        </Link>
      </div>

      {/* Article Hero */}
      <section className="article-hero" style={{ background: `linear-gradient(135deg, ${categoryStyle.bg} 0%, #ffffff 100%)` }}>
        <div className="shell">
          <div className="article-hero-content">
            {/* Category Badge */}
            <div className="article-category-badge">
              <span
                className="article-category-dot"
                style={{ background: categoryStyle.color }}
              />
              <span>{article.category}</span>
            </div>

            {/* Title */}
            <h1>{article.title}</h1>

            {/* Summary */}
            <p className="article-summary">{article.summary}</p>

            {/* Meta Info */}
            <div className="article-meta">
              <span className="article-meta-item">
                <CalendarIcon className="w-4 h-4" />
                <span>发布：{article.publishedAt}</span>
              </span>
              <span className="article-meta-item">
                <ClockIcon className="w-4 h-4" />
                <span>阅读约 {readingTime} 分钟</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <div className="shell article-layout">
        <div className="article-main">
          <article className="article-body">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          {/* Article Footer */}
          <div className="article-footer">
            <div className="article-footer-info">
              <span>最后更新：{article.updatedAt}</span>
            </div>
            <div className="article-footer-actions">
              <Link href="/articles" className="button button-secondary">
                <ArrowLeftIcon className="w-4 h-4" />
                <span>返回指南列表</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="article-sidebar">
          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="article-sidebar-section">
              <div className="article-sidebar-header">
                <BookOpenIcon className="w-5 h-5" />
                <h3>相关文章</h3>
              </div>
              <div className="article-sidebar-body">
                <div className="related-articles-list">
                  {relatedArticles.map((related) => (
                    <Link key={related.slug} href={`/articles/${related.slug}`} className="related-article-card">
                      <span className="related-article-category">{related.category}</span>
                      <span className="related-article-title">{related.title}</span>
                      <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="article-sidebar-section article-sidebar-actions">
            <Link href="/articles" className="button button-secondary button-full">
              <ArrowLeftIcon className="w-4 h-4" />
              <span>返回指南列表</span>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
