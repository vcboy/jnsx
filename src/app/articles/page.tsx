"use client";

import Link from "next/link";
import { useState } from "react";
import { getArticles, getArticleCategories } from "@/lib/data";

// Icons
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

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
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

// Category config for articles
const categoryConfig: Record<string, { color: string; bg: string }> = {
  "路径解释": { color: "#2563eb", bg: "#eff6ff" },
  "避坑核验": { color: "#dc2626", bg: "#fef2f2" },
  "费用说明": { color: "#059669", bg: "#f0fdf4" },
  "升学政策": { color: "#7c3aed", bg: "#f5f3ff" },
};

const defaultCategoryConfig = { color: "#6b7280", bg: "#f3f4f6" };

function getCategoryConfig(category: string) {
  return categoryConfig[category] || defaultCategoryConfig;
}

// Estimate reading time
function getReadingTime(content: string[]) {
  const wordsPerMinute = 300;
  const totalWords = content.join(" ").length;
  return Math.ceil(totalWords / wordsPerMinute);
}

// Article card component
function ArticleCard({ article, featured = false }: { article: ReturnType<typeof getArticles>[number]; featured?: boolean }) {
  const config = getCategoryConfig(article.category);
  const readingTime = getReadingTime(article.content);

  if (featured) {
    return (
      <Link href={`/articles/${article.slug}`} className="article-card-featured">
        <div className="article-featured-content">
          <div className="article-featured-meta">
            <span className="article-category-badge" style={{ color: config.color, background: config.bg }}>
              {article.category}
            </span>
            <span className="article-date">
              <ClockIcon className="w-3.5 h-3.5" />
              {readingTime} 分钟阅读
            </span>
          </div>
          <h2 className="article-featured-title">{article.title}</h2>
          <p className="article-featured-summary">{article.summary}</p>
          <div className="article-featured-footer">
            <span className="article-read-more">
              阅读全文
              <ChevronRightIcon className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="article-card-grid">
      <div className="article-grid-header">
        <span className="article-category-badge" style={{ color: config.color, background: config.bg }}>
          {article.category}
        </span>
        <span className="article-date">{article.publishedAt}</span>
      </div>
      <h3 className="article-grid-title">{article.title}</h3>
      <p className="article-grid-summary">{article.summary}</p>
      <div className="article-grid-footer">
        <span className="article-read-more">
          阅读全文
          <ChevronRightIcon className="w-4 h-4" />
        </span>
        <span className="article-reading-time">
          <ClockIcon className="w-3.5 h-3.5" />
          {readingTime} 分钟
        </span>
      </div>
    </Link>
  );
}

export default function ArticlesPage() {
  const articles = getArticles();
  const categories = getArticleCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <main>
      {/* Hero Section */}
      <section className="section">
        <div className="shell">
          <div className="page-header">
            <span className="page-eyebrow">
              <BookOpenIcon className="w-4 h-4" />
              家长必读
            </span>
            <h1>升学指南</h1>
            <p className="page-lead">
              针对中考后家长最关心的择校问题，提供清晰的解释和实用的核验建议。每篇文章都经过整理，帮助您做出更理性的决策。
            </p>
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <div className="filter-label">
              <FilterIcon className="w-4 h-4" />
              <span>按分类筛选</span>
            </div>
            <div className="category-filters">
              <button
                className={`category-filter ${selectedCategory === null ? "active" : ""}`}
                onClick={() => setSelectedCategory(null)}
              >
                <span className="category-filter-icon" style={{ background: "#f3f4f6", color: "#6b7280" }}>
                  <GridIcon className="w-4.5 h-4.5" />
                </span>
                <span>全部</span>
                <span className="category-count">{articles.length}</span>
              </button>
              {categories.map((category) => {
                const count = articles.filter((a) => a.category === category).length;
                const config = getCategoryConfig(category);
                return (
                  <button
                    key={category}
                    className={`category-filter ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span
                      className="category-filter-icon"
                      style={{
                        background: selectedCategory === category ? "rgba(255,255,255,0.2)" : config.bg,
                        color: selectedCategory === category ? "white" : config.color,
                      }}
                    >
                      <BookOpenIcon className="w-4.5 h-4.5" />
                    </span>
                    <span>{category}</span>
                    <span className="category-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="articles-results">
            <div className="results-header">
              <span className="results-count">
                共 <strong>{filteredArticles.length}</strong> 篇文章
              </span>
              {selectedCategory && (
                <button className="clear-filter" onClick={() => setSelectedCategory(null)}>
                  清除筛选
                </button>
              )}
            </div>

            {filteredArticles.length > 0 ? (
              <div className="articles-layout">
                {/* Featured Article */}
                {featuredArticle && (
                  <div className="articles-featured">
                    <ArticleCard article={featuredArticle} featured />
                  </div>
                )}

                {/* Grid Articles */}
                {gridArticles.length > 0 && (
                  <div className="articles-grid">
                    {gridArticles.map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="8" y1="8" x2="16" y2="16" />
                  <line x1="16" y1="8" x2="8" y2="16" />
                </svg>
                <p>该分类下暂无文章</p>
                <button className="button" onClick={() => setSelectedCategory(null)}>
                  查看全部文章
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
