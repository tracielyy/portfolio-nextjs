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
  description: "Software Engineer Portfolio Website",
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
