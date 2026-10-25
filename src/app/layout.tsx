import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibe Coding Starter | Next.js + Neon + Vercel",
  description:
    "Starter สำหรับคลิป Vibe-01 — schema-first Prisma บน Neon, Server Actions แบบ typed, แล้ว deploy Vercel ให้ build ผ่าน",
  metadataBase: new URL("https://vibe-coding-nextjs-starter.vercel.app"),
  openGraph: {
    title: "Vibe Coding Starter",
    description: "Next.js + Neon DB + Prisma + Server Actions + Vercel",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
