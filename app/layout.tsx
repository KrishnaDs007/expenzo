import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a7da4",
};

export const metadata: Metadata = {
  title: "Expenzo — AI-Powered Expense Tracker",
  description:
    "Track expenses with natural language. AI parses your input, splits group bills, and shows spending insights. No forms, no friction.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Expenzo — AI-Powered Expense Tracker",
    description:
      "Track expenses with natural language. AI parses your input, splits group bills, and shows spending insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
