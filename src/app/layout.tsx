import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviderWrapper } from "./tools/context/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Megasistem - Bem Vindo",
  description: "Sistema de gerenciamento para assistencia tecnica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviderWrapper>
      <html lang="pt-br" className="overflow-x-hidden">
        <body id="body" className={inter.className}>
          {children}
        </body>
      </html>
    </AppProviderWrapper>
  );
}
