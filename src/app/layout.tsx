import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "浙江技能升学择校参考",
  description: "面向浙江初中毕业生家庭的第三方技能升学择校信息与核验工具。"
};

// Info icon component
function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

// Logo icon component
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="#1e3a5f"/>
      <path d="M12 28V12h4.5v6h7v-6h4.5v16h-4.5v-6h-7v6H12z" fill="white"/>
      <circle cx="29" cy="15" r="3" fill="#2563eb"/>
    </svg>
  );
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="topbar">
          <div className="shell nav">
            <Link className="brand" href="/">
              <LogoIcon />
              <span className="brand-text">浙江技能升学择校参考</span>
            </Link>
            <nav className="nav-links" aria-label="主导航">
              <Link href="/schools" className="nav-link">
                <span className="nav-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </span>
                <span>找学校</span>
              </Link>
              <Link href="/programs" className="nav-link">
                <span className="nav-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </span>
                <span>看专业</span>
              </Link>
              <Link href="/articles" className="nav-link">
                <span className="nav-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </span>
                <span>读指南</span>
              </Link>
            </nav>
          </div>
        </header>

        {children}
        <footer className="footer">
          <div className="shell">
            <div className="footer-content">
              <div className="footer-brand">
                <LogoIcon />
                <div className="footer-brand-text">
                  <strong>浙江技能升学择校参考</strong>
                  <span>第三方信息整理与核验工具</span>
                </div>
              </div>
              <div className="footer-sections">
                <div className="footer-section">
                  <h4>快速导航</h4>
                  <div className="footer-links">
                    <Link href="/schools">找学校</Link>
                    <Link href="/programs">看专业</Link>
                    <Link href="/articles">读指南</Link>
                  </div>
                </div>
                <div className="footer-section">
                  <h4>重要说明</h4>
                  <p>数据采用人工整理样例结构，所有关键字段均保留来源状态。第一版不提供报名、录取承诺、线索出售或在线支付。</p>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2024 浙江技能升学择校参考 · 仅供参考</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
