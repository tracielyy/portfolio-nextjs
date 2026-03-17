'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Navbar from './Navbar';

export default function Header({ locale }) {
    const pathname = usePathname();
    console.log("pppathnanme", pathname)

    // Toggle language, keep same page
    const otherLocale = locale === 'en' ? 'zh' : 'en';
    const pathWithoutLocale = pathname.startsWith(`/${locale}`)
        ? pathname.slice(`/${locale}`.length)
        : pathname;
    const toggleUrl = `/${otherLocale}${pathWithoutLocale || ''}`;
    console.log('DEBUG:', { locale, pathname, pathWithoutLocale, toggleUrl });

    return (
        <header>
            {/* <div>test</div> */}
            <Navbar locale={locale} />
            {/* Language Toggle */}
            {/* <div className='pt-16 mx-auto w-full container px-4 sm:px-6 lg:px-8'> */}
            {/* <Link
                    href={toggleUrl}
                    className='text-amber-400'>
                    gg123423523g5v
                </Link> */}
            {/* </div> */}
            {/* <div className='py-40'>
                <Link href={toggleUrl} className="px-25 py-1 border rounded text-amber-300" >
                    {otherLocale.toUpperCase()}
                </Link>
            </div>
            <div>
                <label for="toggle-switch" class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="toggle-switch" className="sr-only peer" />

                    <span className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></span>

                    <span className="absolute left-[2px] top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-full"></span>
                </label>
                <span className=''>{otherLocale.toUpperCase()}</span>
            </div> */}
        </header>
    )

}