import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteEffects } from "@/components/site/SiteEffects";
import { FloatingContactButtons } from "@/components/site/FloatingContactButtons";
import { ScrollProgressBar } from "@/components/site/ScrollProgressBar";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NRK Iron & Steel | India's Trusted Steel Distributors",
  description: "Three decades of trusted steel distribution and processing across India.",
  icons: {
    icon: "/company_logo.webp",
    apple: "/company_logo.webp",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="site-body bg-background font-body text-on-background antialiased" suppressHydrationWarning>
        <SiteHeader />
        <ScrollProgressBar />
        <SiteEffects />
        <main className="site-main">{children}</main>
        <SiteFooter />
        <FloatingContactButtons />
      </body>
    </html>
  );
}
