import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HotJar } from "@/hotjar/HotJar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Sharing App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HotJar>{children}</HotJar>
      </body>
    </html>
  );
}
