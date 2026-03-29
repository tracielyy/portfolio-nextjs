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
  title: "Tracie Portfolio Website",
  description: "Ling Yan Ying's Software Engineer Portfolio Website",
  keywords: ["Tracie Ling", "Ling Yan Ying", "Yan Ying", "Software Engineer", "林妍影", "软件工程师", "代码"],
  authors: [{ name: "Tracie Ling Yan Ying" }],
  openGraph: {
    title: "Tracie Ling | 林妍影 | Software Engineer | 软件工程师",
    description: "JavaScript & Next.js engineer. View my projects and experience.",
    url: "https://tracielyy.com",
    siteName: "Tracie Ling Portfolio",
    type: "website",
  },
  // icons:{
  //   icon:[
  //     { url: '/icon.png' }, // For general favicons
  //     { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
  //   ],
  //   apple:''
  // }
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} /* className="dark" */>
      <body className={`${locale} main-theme ${firaCode.variable}`}>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
