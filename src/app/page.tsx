import { Suspense } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SignupFeed } from "@/components/SignupFeed";
import { listRecentSignups } from "@/lib/actions";

const steps = [
  {
    n: "01",
    title: "Neon Schema",
    body: "ล็อกโครงสร้างด้วย Prisma ก่อน — db push แล้วค่อยเขียน UI",
  },
  {
    n: "02",
    title: "Server Actions",
    body: "Zod validate + Prisma write ฝั่งเซิร์ฟเวอร์ มี TypeScript กำกับ",
  },
  {
    n: "03",
    title: "Vercel Deploy",
    body: "push GitHub → Vercel build · ตั้ง DATABASE_URL / DIRECT_URL แล้วได้ 200 OK",
  },
];

async function RecentSignups() {
  let signups: Awaited<ReturnType<typeof listRecentSignups>> = [];
  let dbError: string | null = null;

  try {
    signups = await listRecentSignups();
  } catch (err) {
    console.error(err);
    dbError = "ยังเชื่อม Neon ไม่ได้ — ตรวจ DATABASE_URL แล้วรัน prisma db push";
  }

  if (dbError) {
    return <p className="text-sm text-danger">{dbError}</p>;
  }

  return <SignupFeed items={signups} />;
}

export default function Home() {
  return (
    <>
      <header className="border-b border-line/80">
        <div className="wrap flex items-center justify-between py-4">
          <a
            href="#top"
            className="display text-lg font-semibold tracking-tight text-ink no-underline"
          >
            DevKhum <span className="text-orange">AI</span>
          </a>
          <nav className="flex items-center gap-3 text-sm">
            <a href="#formula" className="text-muted no-underline hover:text-ink">
              สูตร 3 สเต็ป
            </a>
            <a href="#demo" className="btn-ghost !min-h-9 !px-4 !text-sm">
              ลอง Demo
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="wrap grid items-center gap-10 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-20">
          <div>
            <p className="eyebrow">Vibe-01 · Next.js + Neon + Vercel</p>
            <h1 className="display mt-4 text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight">
              สั่ง AI ทำเว็บ{" "}
              <span className="text-orange">Next.js</span>
              <br />
              ไม่ให้พัง
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
              อย่าโยนพรอมต์ลอยๆ — ยัดสกิลให้เอเจนต์ เริ่มจาก schema-first บน Neon
              แล้วค่อยสั่ง Server Actions + หน้าบ้าน สุดท้าย deploy Vercel ผ่าน GitHub
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#demo" className="btn-primary">
                ลอง Waitlist จริง
              </a>
              <a
                href="https://github.com/ChinawatDc/vibe-coding-nextjs-starter"
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                เปิด GitHub
              </a>
            </div>
          </div>

          <aside className="panel relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange/20 blur-3xl"
            />
            <p className="eyebrow">Live stack</p>
            <ul className="mt-4 space-y-3 font-mono text-sm">
              <li className="flex justify-between gap-3 border-b border-line/50 pb-2">
                <span className="text-muted">framework</span>
                <span>Next.js 16 App Router</span>
              </li>
              <li className="flex justify-between gap-3 border-b border-line/50 pb-2">
                <span className="text-muted">database</span>
                <span>Neon Postgres</span>
              </li>
              <li className="flex justify-between gap-3 border-b border-line/50 pb-2">
                <span className="text-muted">orm</span>
                <span>Prisma schema-first</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-muted">mutations</span>
                <span>Server Actions + Zod</span>
              </li>
            </ul>
          </aside>
        </section>

        <section
          id="formula"
          className="border-y border-line/80 bg-elevated/40 py-14 md:py-16"
        >
          <div className="wrap">
            <p className="eyebrow">3-Step Prompt Formula</p>
            <h2 className="display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Neon Schema → Server Actions → Vercel
            </h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <li key={step.n} className="panel">
                  <div className="flex items-center gap-3">
                    <span className="step-dot">{step.n}</span>
                    <h3 className="display text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="demo"
          className="wrap grid gap-8 py-14 md:grid-cols-2 md:py-16"
        >
          <div className="panel">
            <p className="eyebrow">Interactive demo</p>
            <h2 className="display mt-2 text-2xl font-semibold">
              ลงทะเบียน Waitlist
            </h2>
            <p className="mt-2 text-sm text-muted">
              ฟอร์มนี้เรียก{" "}
              <code className="text-cyan">createVibeSignup</code> แล้วเขียนตาราง{" "}
              <code className="text-cyan">vibe_signups</code> บน Neon
            </p>
            <div className="mt-6">
              <WaitlistForm />
            </div>
          </div>

          <div className="panel">
            <p className="eyebrow">Recent from Neon</p>
            <h2 className="display mt-2 text-2xl font-semibold">รายชื่อล่าสุด</h2>
            <div className="mt-5">
              <Suspense
                fallback={
                  <p className="text-sm text-muted">กำลังโหลดจาก Neon…</p>
                }
              >
                <RecentSignups />
              </Suspense>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-line/80 py-8">
        <div className="wrap flex flex-col gap-2 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            สอนโดย <span className="text-ink">DevKhum AI</span> · ชุดพรอมต์อยู่ใน{" "}
            <code className="text-cyan">ONE_SHOT_PROMPT.md</code>
          </p>
          <p className="font-mono text-xs">
            github.com/ChinawatDc/vibe-coding-nextjs-starter
          </p>
        </div>
      </footer>
    </>
  );
}
