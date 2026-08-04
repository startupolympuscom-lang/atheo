import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atheo — Your talent deserves a business behind it.",
  description:
    "Atheo handles the deals, strategy and operations behind your career — so you can focus on creating what moves people. Creator-first. Transparent by design.",
  metadataBase: new URL("https://atheo.co"),
  openGraph: {
    title: "Atheo — Your talent deserves a business behind it.",
    description:
      "Atheo handles the deals, strategy and operations behind your career — so you can focus on creating what moves people.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-atheo-white text-atheo-aubergine font-body">
        {children}
      </body>
    </html>
  );
}
