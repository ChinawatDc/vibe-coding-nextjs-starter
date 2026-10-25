# Vibe Coding Next.js Starter

[![Live](https://img.shields.io/badge/demo-Vercel-black?style=flat-square)](https://vibe-coding-nextjs-starter.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

Starter สำหรับคลิป **Vibe-01** (DevKhum AI)  
**Next.js + Neon Postgres + Prisma (schema-first) + Server Actions + Vercel**

> สั่ง AI Agent ทีเดียวให้ได้เว็บสวยและบิลด์ไม่พัง → คัดลอกพรอมต์ใน [`ONE_SHOT_PROMPT.md`](./ONE_SHOT_PROMPT.md)

## สูตร 3 สเต็ป

```
Neon Schema  →  Server Actions (+ Zod)  →  Vercel Deploy (GitHub)
```

| ขั้น | ทำอะไร |
|---|---|
| 1 | ล็อก `prisma/schema.prisma` แล้ว `npx prisma db push` |
| 2 | เขียน Server Action มี TypeScript + Zod กำกับ ก่อนหน้าบ้าน |
| 3 | Push GitHub → Vercel ตั้ง `DATABASE_URL` / `DIRECT_URL` |

## Stack

- Next.js 16 (App Router) · React 19 · Tailwind 4
- Neon Postgres (ap-southeast-1)
- Prisma 6 + `@prisma/adapter-neon`
- Zod · Server Actions

## รันท้องถิ่น

```bash
cp .env.example .env
# ใส่ connection string จาก Neon Console

npm ci
npx prisma generate
npx prisma db push
npm run dev
```

เปิด http://localhost:3000

## Env

| ตัวแปร | ความหมาย |
|---|---|
| `DATABASE_URL` | Neon **pooled** (`*-pooler*`) สำหรับ Prisma Client |
| `DIRECT_URL` | Neon **direct** สำหรับ `prisma db push` / migrate |

## Deploy (Vercel)

1. Import repo จาก GitHub
2. ใส่ env ทั้งสองตัว (Production + Preview)
3. Build: `prisma generate && next build` (ดู `package.json` → `build`)
4. Deploy

## โครงสร้างสำคัญ

```
prisma/schema.prisma      # schema-first
src/lib/prisma.ts         # Neon adapter
src/lib/actions.ts        # Server Actions + Zod
src/app/page.tsx          # one-page dark tech
ONE_SHOT_PROMPT.md        # พรอมต์สั่ง Agent ทีเดียว
```

## License

MIT · DevKhum AI / ChinawatDc
