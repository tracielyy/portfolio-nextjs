'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import { LocaleHelper } from '@/lib/utils/localehelper';

export default function Navbar({ locale }) {
    const dict = getDictionary(locale);
    const pathname = usePathname();
    const localeHelper = new LocaleHelper(pathname);
    const [isOpen, setIsOpen] = useState(false);  // Menu

    return (
        <nav className='navbar theme-bg-color'>

            <div className="flex justify-between items-center h-16 w-full">

                {/* Logo */}
                <Link href={localeHelper.localizedUrl('/')} className="inline-flex items-center gap-2">
                    {/* Ling Yan Ying */}
                    <Image
                        src="/favicon/icon.svg"
                        alt="Ling Yan Ying"
                        width={40}
                        height={40}
                    />
                    <span>Yan Ying</span>
                </Link>

                {/* Desktop menu - hidden on mobile, flex on md+ */}
                <div className="hidden lg:flex space-x-14 ">
                    <Link href={localeHelper.localizedUrl('/')}>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-100 hover:to-purple-800">
                            {dict.nav.home}
                        </span>
                    </Link>
                    <Link className='site-links' href={localeHelper.localizedUrl('/#about')}>{dict.nav.about}</Link>
                    <Link className='site-links' href={localeHelper.localizedUrl('/#skills')}>{dict.nav.skills}</Link>
                    <Link className='site-links' href={localeHelper.localizedUrl('/#experience')}>{dict.nav.experience}</Link>
                    <Link className='site-links' href={localeHelper.localizedUrl('/#projects')}>{dict.nav.projects}</Link>
                    <Link className='site-links' href={localeHelper.localizedUrl('/#contact')}>{dict.nav.contact}</Link>
                </div>

                {/* Mobile menu - visible on mobile, hidden on md+ */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="site-links lg:hidden p-2 hover:cursor-pointer "
                >
                    {!isOpen ?
                        /*  Hamburger icon */
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {/* Three separate lines in one path */}
                            <path d="M4 6h16" strokeWidth={2} strokeLinecap="round" />
                            <path d="M4 12h16" strokeWidth={2} strokeLinecap="round" />
                            <path d="M4 18h16" strokeWidth={2} strokeLinecap="round" />
                        </svg>

                        :
                        /* Cross Icon */
                        <svg viewBox="0 0 10 10 " width="0.75em" height="0.75em" stroke="currentColor" strokeWidth="2">
                            <path d="M1,1 9,9 M9,1 1,9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                </button>
            </div>

            {/* Mobile Menu - dropdown */}
            {isOpen && (
                <div className="lg:hidden pb-4 flex flex-col items-center space-y-2">
                    <Link href={localeHelper.localizedUrl('/#about')} onClick={() => setIsOpen(!isOpen)} className="block py-2 site-links">{dict.nav.about}</Link>
                    <Link href={localeHelper.localizedUrl('/#skills')} onClick={() => setIsOpen(!isOpen)} className="block py-2 site-links">{dict.nav.skills}</Link>
                    <Link href={localeHelper.localizedUrl('/#experience')} onClick={() => setIsOpen(!isOpen)} className="block py-2 site-links">{dict.nav.experience}</Link>
                    <Link href={localeHelper.localizedUrl('/#projects')} onClick={() => setIsOpen(!isOpen)} className="block py-2 site-links">{dict.nav.projects}</Link>
                    <Link href={localeHelper.localizedUrl('/#contact')} onClick={() => setIsOpen(!isOpen)} className="block py-2 site-links">{dict.nav.contact}</Link>
                </div>
            )}
        </nav>
    )
}
