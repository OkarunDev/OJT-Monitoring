import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Pagsulong OJT Monitoring System",
  description: "Monitoring system for Pagsulong OJT attendance and statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. We apply the font to the body */}
      <body className={`${inter.className} antialiased text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
