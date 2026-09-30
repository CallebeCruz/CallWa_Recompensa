import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CallWa — Nosso céu",
  description: "Uma luminária conectada feita para aproximar quem está longe.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
