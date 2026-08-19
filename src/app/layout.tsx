import type { Metadata } from "next";
import { Manrope, DM_Serif_Display, Geist_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIPTS - College Career & Placement Platform",
  description: "An airy, intuitive ecosystem connecting visionary students with premier opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSerifDisplay.variable} ${geistMono.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col relative overflow-x-hidden font-sans antialiased text-on-surface bg-background selection:bg-primary-container selection:text-on-primary-container">
        {/* Ambient Glow Background */}
        <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-secondary-container/30 via-background to-tertiary-fixed/20"></div>
        {children}
      </body>
    </html>
  );
}
