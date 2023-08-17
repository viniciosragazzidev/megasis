import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviderWrapper } from "./tools/context/AppProvider";
import NextAuthProvider from "./tools/components/authComp/NextAuthProvider";
import Header from "./tools/components/ui/header";

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
    <NextAuthProvider>
      <AppProviderWrapper>
        <html lang="pt-br" className="overflow-x-hidden">
          <body id="body" className={` min-h-screen ${inter.className}`}>
            {children}
          </body>
        </html>
      </AppProviderWrapper>
    </NextAuthProvider>
  );
}
