import { getDictionary } from '@/lib/dictionary';
import { BadgesDisplay } from '@/components/ui/Badge';
import { Experience } from '@/lib/models/Experience.class';
import { PiArrowFatLinesUpBold } from "react-icons/pi";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ExperienceSection({ locale }) {
    const experiences = Experience.getAllExperiences(locale);
    const dict = getDictionary(locale);

    return (
        <section id="experience" className="section-container">
            <h2 className="section-title">{dict.section.experience.title}</h2>
            <div className='section-content-col'>

                {
                    experiences.map((experience) => (
                        <div key={experience.id} className='container'>

                            <div className='experience-card'>
                                <span className="text-gray-500 text-sm">{experience.displayExperienceDuration()}</span>
                                <span className='experience-job-title pt-2 pb-3 block'>
                                    <b>
                                        {experience.jobTitle} @ &nbsp;
                                        <a href={experience.website} target="_blank">
                                            <span className='text-accent-secondary inline-flex items-center gap-2 no-underline hover:underline hover:decoration-accent-secondary'>
                                                {experience.organisation}
                                                <FaExternalLinkAlt size={12}/>
                                            </span>
                                        </a>
                                    </b>
                                </span>

                                {/* Descriptions */}
                                <ul className='ul-point-container'>
                                    {experience.descriptionPoints.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>

                                {/* Tags */}
                                <BadgesDisplay labelArray={experience.tags} />
                            </div>
                            {experience.id !== 0 && (
                                <div className='flex flex-col items-center pt-3'>
                                    <PiArrowFatLinesUpBold className='text-accent-secondary' />
                                </div>
                            )}
                        </div>
                    ))
                }

            </div>
        </section>
    )
}