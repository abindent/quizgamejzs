// CSS
import "./globals.css";

// FLOWBITE
import { ThemeModeScript } from "flowbite-react";

// METADATA
import type { Metadata } from "next";

// LAYOUT
import Layout from "@/layout/layout";

export const metadata: Metadata = {
  title: "Quizdom",
  description: "Annual quiz competition of Jalpaiguri Zilla School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className="dark:bg-gradient-to-r from-blue-500 via-40% via-amber-300 to-pink-500">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
