import "./globals.css";
import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Daftar — Finance OS for Saudi startups",
  description:
    "Your CFO and accountant in a box. Guided setup, automated bookkeeping, ZATCA-ready compliance — in Arabic and English.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
