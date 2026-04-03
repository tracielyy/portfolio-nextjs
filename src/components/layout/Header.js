'use client';

import Navbar from './Navbar';

export default function Header({ locale }) {

    return (
        <header>
            <Navbar locale={locale} />
        </header>
    )
}