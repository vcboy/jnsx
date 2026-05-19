import Link from "next/link";
import type { School } from "@/data/types";
import { getSchoolProgramsSummary } from "@/lib/data";
import { StatusBadge } from "./StatusBadge";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-7a2 2 0 0 1 4 0v7"/>
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 0 0-2.83L12 17l-4.58-4.59a2 2 0 0 0-2.82 0L2 12V7a2 2 0 0 1 2-2h5l6.41 6.41a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83L18 3"/>
    </svg>
  );
}

export function SchoolCard({ school }: { school: School }) {
  const programs = getSchoolProgramsSummary(school.id).slice(0, 3);

  return (
    <article className="school-card">
      <div className="school-card-main">
        <div className="school-card-header">
          <h3>
            <Link href={`/schools/${school.id}`}>{school.name}</Link>
          </h3>
          <div className="school-card-meta">
            <span className="meta-item">
              <MapPinIcon />
              {school.city} · {school.district}
            </span>
            <span className="meta-item">
              <BuildingIcon />
              {school.ownership}
            </span>
            <span className="meta-item">
              <TagIcon />
              {school.schoolNature}
            </span>
          </div>
        </div>
        <p className="school-card-summary">{school.summary}</p>
        {programs.length > 0 && (
          <div className="school-card-programs">
            <span className="programs-label">开设专业：</span>
            <div className="program-tags">
              {programs.map((program) => (
                <span className="program-tag" key={program}>{program}</span>
              ))}
              {getSchoolProgramsSummary(school.id).length > 3 && (
                <span className="program-tag-more">+{getSchoolProgramsSummary(school.id).length - 3}</span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="school-card-actions">
        <StatusBadge status={school.sourceStatus} />
        <Link className="school-card-button" href={`/schools/${school.id}`}>
          <span>查看档案</span>
          <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
}
