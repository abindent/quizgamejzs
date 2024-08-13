// CSS
import "./globals.css";

// FLOWBITE
import { ThemeModeScript } from "flowbite-react";

// METADATA
import type { Metadata } from "next";

// LAYOUT
import Layout from "@/layout/layout";

// FONTAWESOME
import { config } from '@fortawesome/fontawesome-svg-core'

// CSS
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

// CONFIG FONTAWESOME
config.autoAddCss = false;

// METADATA
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
      <body className="dark:bg-slate-500">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
