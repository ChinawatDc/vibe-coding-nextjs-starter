"use client";

import { useActionState } from "react";
import {
  createVibeSignup,
  type SignupState,
} from "@/lib/actions";

const initial: SignupState | null = null;

export function WaitlistForm() {
  const [state, action, pending] = useActionState(createVibeSignup, initial);

  return (
    <form action={action} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            ชื่อ
          </span>
          <input
            name="name"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Chinawat"
            className="field"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            อีเมล
          </span>
          <input
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            placeholder="you@devkhum.ai"
            className="field"
          />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          โน้ต (ไม่บังคับ)
        </span>
        <input
          name="note"
          maxLength={280}
          placeholder="กำลังเรียน Vibe-01..."
          className="field"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full sm:w-auto"
      >
        {pending ? "กำลังบันทึก…" : "ลงทะเบียนผ่าน Server Action"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`min-h-[1.25rem] text-sm ${
          state?.ok === false
            ? "text-danger"
            : state?.ok
              ? "text-cyan"
              : "text-muted"
        }`}
      >
        {state?.message ?? "ข้อมูลถูก validate ด้วย Zod แล้วเขียนลง Neon"}
      </p>
    </form>
  );
}
