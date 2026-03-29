'use client'
import Image from 'next/image';
import { getData } from '@/lib/data';
import { getDictionary } from '@/lib/dictionary';
import { usePathname } from 'next/navigation';
import { LocaleHelper } from '@/lib/utils/localehelper';
import Socials from '@/components/ui/Socials'
import { BorderOnlyButton, BaseButton } from '@/components/ui/Buttons/Button';

export default function HeroSection({ locale }) {
    const pathname = usePathname();
    const localeHelper = new LocaleHelper(pathname);
    const basicData = getData(locale, 'basic');
    const socialsData = getData(locale, 'socials');

    const dict = getDictionary(locale);
    const getSpaceIfEnglish = (locale) => locale === 'en' ? ' ' : '';
    const space = getSpaceIfEnglish(locale);

    return (
        <section className="section-container">

            {/* Inner Container */}
            <div className="p-2 sm:p-6 md:p-10 lg:p-8">
                <div className="flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between gap-8 lg:gap-10">

                    {/* Image Container - Center on mobile, left on desktop */}
                    <div className="flex-shrink-0">
                        <div
                            className="relative w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-gray-800 shadow-xl mx-auto lg:float-right">
                            <Image
                                src="/images/personal/hero-personal-dp.jpg"
                                alt="Your Name"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 240px, 320px"
                                priority
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center lg:text-left lg:w-150">

                        {/* Welcome pill */}
                        <div className="inline-block bg-accent-primary/20 text-accent-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            {dict.section.hero.welcome}
                        </div>

                        {/* Name gradient */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-accent-secondary to-heading">
                                {
                                    dict.section.hero.greetings
                                        .replaceAll('$lastname', basicData.last_name)
                                        .replaceAll('$firstname', basicData.first_name)
                                        .replaceAll('$space', space)
                                }
                            </span>
                        </h1>

                        {/* Role */}
                        <h2 className="text-xl md:text-2xl text-gray-400 mb-2 font-(family-name:--font-fira-code)">
                            {dict.section.hero.role}
                        </h2>

                        {/* Bio */}
                        <p className="text-gray-500 mb-8 leading-relaxed font-(family-name:--font-fira-code)">
                            {basicData.bio}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <BaseButton
                                classNames='general-btn bg-gradient-to-r from-accent-primary to-violet-400 text-white hover:from-violet-400 hover:to-accent-primary transition-all duration-200'
                                href={localeHelper.localizedUrl('/#contact')}
                                label={dict.section.hero.contact}
                            />
                            <BorderOnlyButton
                                classNames='general-btn border-slate-border text-gray-200 hover:border-accent-secondary hover:text-accent-secondary'
                                href="/Resume.pdf"
                                external={true}
                                label={dict.section.hero.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        </div>

                        <div>
                            <Socials socialsData={socialsData} />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );

}