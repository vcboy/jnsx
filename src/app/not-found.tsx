import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell section">
      <div className="info-panel">
        <div className="eyebrow">未找到</div>
        <h1>这个页面暂时不存在</h1>
        <p className="lead">可能是数据还未补齐，或链接已经调整。</p>
        <Link className="button" href="/">回到首页</Link>
      </div>
    </main>
  );
}
