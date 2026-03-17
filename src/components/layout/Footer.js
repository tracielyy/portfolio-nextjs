import { getDictionary } from '@/lib/dictionary';

export default function Footer({ locale }) {
    const dict = getDictionary(locale);
    return (
        <footer className="py-12 px-4">
            <div className="max-w-6xl mx-auto">

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-500 text-sm">{dict.footer.descriptions}</p>
                    <p className="text-gray-600 text-sm">{dict.footer.copyright}</p>
                </div>

            </div>
        </footer>
    );
}