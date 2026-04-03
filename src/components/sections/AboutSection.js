import { getDictionary } from '@/lib/dictionary';
import { BadgesDisplay } from '@/components/ui/Badge';
import { Basic } from '@/lib/models/Basic.class';

export default function AboutSection({ locale }) {
    const dict = getDictionary(locale);
    const basicData = Basic.getBasic(locale);

    return (
        <section id="about" className="section-container">
            <h2 className="section-title">{dict.section.about.title}</h2>

            {/* Container to wrap the content */}
            <div className='flex flex-col gap-8 flex-wrap w-full mx-auto lg:px-20 md:px-8'>
                <p className='w-full text-gray-400'>
                    {dict.section.about.descriptions}
                </p>
                {/* Basic details section */}
                <div className='w-full text-wrap'>
                    <h2 className="text-xl text-left text-accent-secondary">{dict.section.about.basic.title}</h2>

                    <div className='about-basic-content'>
                        <div className='about-column'>

                            {/* Name */}
                            <div className='about-field-container'>
                                <span className='about-field-label'>{dict.section.about.basic.content.name}</span>
                                <span className='about-field-value'>{basicData.getFullName(locale)}</span>
                            </div>

                            {/* Alias */}
                            <div className='about-field-container'>
                                <span className='about-field-label'>{dict.section.about.basic.content.alias}</span>
                                <span className='about-field-value'>{basicData.alias}</span>
                            </div>

                            {/* Location */}
                            <div className='about-field-container'>
                                <span className='about-field-label'>{dict.section.about.basic.content.location}</span>
                                <span className='w-3/5'>{basicData.location}</span>
                            </div>

                            {/* Email */}
                            <div className='about-field-container'>
                                <span className='about-field-label'>{dict.section.about.basic.content.email}</span>
                                <span className='about-field-value'>{basicData.email}</span>
                            </div>

                        </div>
                        <div className='about-column'>

                            {/* Interest */}
                            <div className='about-field-tag-container'>
                                <span className='about-field-label'>{dict.section.about.basic.content.interest}</span>
                                <BadgesDisplay labelArray={basicData.interest} />
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </section >
    )
}