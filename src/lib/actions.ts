"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "./prisma";

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "ชื่อสั้นเกินไป")
    .max(80, "ชื่อยาวเกินไป"),
  email: z
    .string()
    .trim()
    .email("อีเมลไม่ถูกต้อง")
    .max(160),
  note: z
    .string()
    .trim()
    .max(280, "ข้อความยาวเกินไป")
    .optional()
    .or(z.literal("")),
});

export type SignupState =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function createVibeSignup(
  _prev: SignupState | null,
  formData: FormData,
): Promise<SignupState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    note: formData.get("note") || "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง",
    };
  }

  const { name, email, note } = parsed.data;

  try {
    await prisma.vibeSignup.create({
      data: {
        name,
        email: email.toLowerCase(),
        note: note || null,
      },
    });
  } catch (err) {
    const code =
      err && typeof err === "object" && "code" in err
        ? String((err as { code: string }).code)
        : "";
    if (code === "P2002") {
      return { ok: false, message: "อีเมลนี้ลงทะเบียนแล้ว" };
    }
    console.error("createVibeSignup", err);
    return { ok: false, message: "บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง" };
  }

  revalidatePath("/");
  return { ok: true, message: "ลงทะเบียนสำเร็จ — ยินดีต้อนรับสู่ Vibe Coding" };
}

export async function listRecentSignups(limit = 8) {
  return prisma.vibeSignup.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      note: true,
      createdAt: true,
    },
  });
}
