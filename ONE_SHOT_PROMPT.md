# One-shot Prompt — Vibe-01 (คัดลอกใช้กับ AI Agent ได้เลย)

วางข้อความด้านล่างทั้งก้อนให้ Cursor / Claude / Agent ของคุณ **ครั้งเดียว**  
อย่าแยกเป็นหลายรอบถ้าไม่จำเป็น

---

```text
คุณคือ senior full-stack ที่สร้างเว็บ Next.js ให้สวยและบิลด์ไม่พัง

## เป้าหมาย
สร้างโปรเจกต์ one-page ชื่อ vibe-coding-nextjs-starter สำหรับคลิปสอน Vibe Coding:
Next.js (App Router) + Neon Postgres + Prisma (schema-first) + Server Actions + deploy Vercel ผ่าน GitHub

## Hard rules
1. โหลด / ใช้สกิล UI/UX Pro Max (หรือเทียบเท่า) ก่อนออกแบบ UI — ห้ามหน้าตาโหล / purple gradient / Inter เปล่าๆ
2. Schema-first: เขียน prisma/schema.prisma และ prisma db push ให้ผ่านก่อน แล้วค่อยเขียน UI
3. Mutations ต้องเป็น Server Actions + Zod validation + TypeScript เข้ม
4. ใช้ Neon pooled URL เป็น DATABASE_URL และ DIRECT_URL (non-pooler) สำหรับ Prisma CLI
5. ใช้ @prisma/adapter-neon กับ Prisma Client
6. หน้าแรกต้อง dynamic (force-dynamic) เพราะอ่าน DB
7. อย่า commit ไฟล์ .env — มีแค่ .env.example
8. ทำ repo ให้พร้อม public: README, LICENSE MIT, topics, homepage

## Visual (บังคับ)
- Dark Tech พื้นหลัง #070B14
- ตัวหนังสือขาว / accent ส้ม #FF7A18 + cyan นีออนสำหรับ eyebrow/โค้ด
- ฟอนต์: Space Grotesk (display) + DM Sans (body)
- One-page: Hero + สูตร 3 สเต็ป (Neon Schema → Server Actions → Vercel) + Waitlist form จริง + รายชื่อล่าสุดจาก Neon + footer DevKhum AI
- ปุ่มสูงอย่างน้อย 44px, focus ring ชัด, รองรับ prefers-reduced-motion
- ภาษา UI เป็นไทย

## Data model
model VibeSignup {
  id, name (varchar 80), email (unique varchar 160), note (optional varchar 280), createdAt
  table map: vibe_signups
}

## ลำดับงาน (ทำตามนี้)
1) Scaffold Next.js (TS, App Router, Tailwind, src/)
2) Provision / เชื่อม Neon แล้วใส่ .env (DATABASE_URL + DIRECT_URL)
3) Prisma schema → generate → db push
4) lib/prisma.ts + Server Action createVibeSignup + listRecentSignups
5) UI one-page ตาม visual ข้างบน
6) README + ONE_SHOT_PROMPT.md + .env.example
7) npm run build ต้องผ่าน
8) สร้าง/อัปเดต GitHub repo ChinawatDc/vibe-coding-nextjs-starter แล้ว push main
9) Deploy Vercel ตั้ง env DATABASE_URL + DIRECT_URL → ได้ URL production

## Definition of done
- เปิดหน้าเว็บแล้วส่งฟอร์มแล้วขึ้นรายชื่อจาก Neon ได้
- Build / deploy ผ่าน
- README อธิบาย 3 สเต็ปชัดเจน
- ไม่มี secret ใน git
```

---

## ใช้ยังไงในคลิป

1. เปิด Agent mode ใน Cursor
2. วางพรอมต์ด้านบนทั้งก้อน
3. อนุมัติ Neon / Vercel / GitHub เมื่อ Agent ขอ
4. แปะลิงก์ repo + live demo ในคอมเมนต์ปักหมุด
