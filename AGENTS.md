# AGENTS.md

## Project Context

This project is a Next.js MVP for a Zhejiang skill-education school selection reference platform. It serves families of junior-high graduates who need to understand技工院校, especially private技工学校, after the high-school entrance exam.

The product position is intentionally narrow:

- Third-party school-selection information and decision support.
- Not an official government admissions platform.
- Not an enrollment, payment, lead-selling, or admission-guarantee product.
- The core value is helping parents read, compare, and verify scattered public information.

## Product Rules

- Always keep the third-party disclaimer visible in global layout and school detail contexts.
- Do not use misleading terms such as "官方招生平台", "保录取", "包就业", or unqualified official-sounding claims.
- Every important school/program/fee field must either have a source status or clearly show "待核验".
- Private school detail pages must include fee and risk reminders.
- Paid ranking, signup forms, online payment, school CRM, and student lead collection are out of scope for the MVP.

## Data Model

Data is currently local and manually maintained under `src/data`.

- `schools.ts`: school profiles.
- `programs.ts`: admissions/program records and program guides.
- `articles.ts`: parent-facing explanatory content.
- `sources.ts`: source and verification references.
- `types.ts`: shared TypeScript types.

Use the source status values exactly as defined:

- `已官方核验`
- `来自学校公开信息`
- `待核验`

## Development

Preferred stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local JSON/TS data modules for MVP

Useful commands:

```bash
node "D:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install
node "D:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev
node "D:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run typecheck
node "D:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build
```

The normal `npm` command may be broken in this Windows environment, so prefer the explicit npm CLI path above unless it has been fixed.

## UI Direction

The interface should feel like a calm public-interest reference tool rather than a school advertising portal. Prefer dense, readable information surfaces, restrained colors, obvious filters, and clear source/risk labels.

Avoid generic promotional hero copy and avoid making school cards look like ads. Schools should be sortable/filterable by user need, not by commercial priority.

## Verification Checklist

Before handing off substantial changes:

- Run `typecheck`.
- Run `build`.
- Confirm `/`, `/schools`, one school detail page, `/programs`, one program detail page, `/articles`, and one article detail page render successfully.
- Check that no new UI copy implies official endorsement, guaranteed admission, guaranteed employment, or paid ranking.
