import type { Metadata } from "next";
import { Inter, Tomorrow } from "next/font/google";
import "./globals.css";

const inter = Tomorrow({weight: "300", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
