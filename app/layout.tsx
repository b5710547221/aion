import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aion Thailand: Book a test drive",
  description: "Book a test drive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
