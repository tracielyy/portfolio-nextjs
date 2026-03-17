// Import global styles and fonts
import '@/app/[locale]/globals.css'
import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center  dark:bg-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white-900 mb-4">404</h1>
        <p className="text-xl text-emerald-100 mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-block px-6 py-3  text-white rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}