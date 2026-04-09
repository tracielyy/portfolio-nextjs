import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { notFound } from 'next/navigation';

const locales = ['en', 'zh'];

import { Fira_Code } from 'next/font/google';

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fira-code',
});

export const metadata = {
  title: "Tracie Ling Yan Ying's Portfolio Website",
  description: "Ling Yan Ying's Software Engineer Portfolio Website",
  keywords: ["Tracie Ling", "Ling Yan Ying",
    "Yan Ying", "Software Engineer",
    "Software Developer", "Backend Engineer", "林妍影", "软件工程师", "后端开发工程师", "后端工程师", "代码"],
  authors: [{ name: "Tracie Ling Yan Ying" }],
  alternates: {
    canonical: "https://tracielyy.com/en",
  },
  openGraph: {
    title: "Tracie Ling Yan Ying | 林妍影 | Software Engineer | 软件工程师",
    description: "JavaScript & Next.js engineer. View my projects and experience.",
    url: "https://tracielyy.com/en",
    siteName: "Tracie Ling Portfolio",
    type: "website",
  },
  icons:{
    icon:[
      { url: '/favicon/favicon.ico' }, // For general favicons
      { url: '/favicon/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple:'/favicon/apple-touch-icon.png'
  }
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${locale} main-theme ${firaCode.variable}`}>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
