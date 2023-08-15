import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../tools/components/ui/header";
import { Toaster } from "../tools/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Megasistem - Dashboard",
  description: "Sistema de gerenciamento para assistencia tecnica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body id="body" className={inter.className}>
        <Header />
        <Toaster />

        {children}
      </body>
    </html>
  );
}
