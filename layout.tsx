import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "İhale Hukuku Asistanı",
  description: "Türk kamu ihale mevzuatı ve KİK kararları için yapay zekâ destekli arama asistanı."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

