import { notFound } from 'next/navigation';
import { TbArrowBackUp } from "react-icons/tb";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FaExternalLinkAlt, FaGithub, FaImage } from 'react-icons/fa'
import { Tooltip } from '@/components/ui/Tooltip/Tooltip';

import Image from 'next/image'
import { BadgesDisplay } from '@/components/ui/Badge'
import { BaseButton, DisabledButton } from '@/components/ui/Buttons/Button'
import { LocaleHelper } from '@/lib/utils/localehelper';
import { Project } from '@/lib/models/Project.class';


export default async function ProjectPage({ params }) {
    const { locale, slug } = await params;
    const currentProject = Project.findBySlug(locale, slug);

    // Handle missing projects
    if (!currentProject) {
        notFound(); // Shows 404 page
    }

    const prevProject = Project.findPreviousById(locale, currentProject.id);
    const nextProject = Project.findNextById(locale, currentProject.id);

    const disablePrevBtn = currentProject.id === prevProject.id;
    const disableNextBtn = currentProject.id === nextProject.id;

    const localeHelper = new LocaleHelper(`/${locale}`);

    return (
        <section className="page-container">

            {/* Shared width container */}
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
                {/* Back Button */}
                <div className='flex flex-col items-start w-full'>
                    <BaseButton
                        label='Back'
                        href={localeHelper.localizedUrl('/#projects')}
                        icon={<TbArrowBackUp />}
                        classNames='label-icon text-gray-400 hover:text-accent-secondary transition-colors duration-200'
                    />
                </div>

                {/* Card */}
                <div className="w-full bg-card border border-[#2A2F42] border-t-2 border-t-accent-primary rounded-xl">

                    {/* Project Image */}
                    {currentProject.image ? (
                        <Image
                            src={`/images/projects/${currentProject.image}`}
                            alt={currentProject.title}
                            width={400}
                            height={250}
                            className="w-full rounded-t-xl"
                        />
                    ) : (
                        <div className="w-full h-[250px] bg-[#161A22] flex flex-col items-center justify-center gap-2 text-gray-600">
                            <FaImage size={32} />
                            <span className="text-xs">No image available</span>
                        </div>
                    )}


                    <div className="flex flex-col gap-3 p-6">

                        {/* Title + icon links */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-accent-secondary text-xl font-semibold">{currentProject.title}</h1>
                            <div className="flex gap-2">

                                {/* Live Website Link */}
                                {currentProject.live ? (
                                    <a
                                        href={currentProject.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group inline-flex items-center justify-center w-7 h-7 border border-[#2A2F42] rounded-md text-accent-secondary hover:border-accent-primary transition-colors"
                                    >
                                        <Tooltip label="Visit Site" />
                                        <FaExternalLinkAlt size={11} />
                                    </a>
                                ) : (
                                    <span className="relative group inline-flex items-center justify-center w-7 h-7 border border-[#2A2F42] rounded-md text-gray-600 cursor-not-allowed">
                                        <Tooltip label="Not Available" />
                                        <FaExternalLinkAlt size={11} />
                                    </span>
                                )}

                                {/* Repository Link */}
                                {currentProject.repo ? (
                                    <a
                                        href={currentProject.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group inline-flex items-center justify-center w-7 h-7 border border-[#2A2F42] rounded-md text-accent-secondary hover:border-accent-primary transition-colors"
                                    >
                                        <Tooltip label="Repo" />
                                        <FaGithub size={11} />
                                    </a>
                                ) : (
                                    <span className="relative group inline-flex items-center justify-center w-7 h-7 border border-[#2A2F42] rounded-md text-gray-600 cursor-not-allowed">
                                        <Tooltip label="Not Available" />
                                        <FaGithub size={11} />
                                    </span>
                                )}

                            </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed">{currentProject.description}</p>

                        {/* Tags */}
                        <div className="border-t border-[#2A2F42] pt-3">
                            <BadgesDisplay labelArray={currentProject.tags} />
                        </div>

                    </div>
                </div>

                {/* Route Between Previous and Next */}
                <div className='flex items-start justify-between w-full pt-8'>
                    {disablePrevBtn ?
                        (<DisabledButton
                            label='Prev'
                            icon={<FaArrowLeft />}
                            iconPosition='left'
                            classNames='label-icon'
                        />) :
                        (<BaseButton
                            label='Prev'
                            href={localeHelper.localizedUrl(`/projects/${prevProject.slug}`)}
                            icon={<FaArrowLeft />}
                            tooltip={<Tooltip label={prevProject.title} />}
                            classNames='label-icon text-gray-400 hover:text-accent-secondary transition-colors duration-200'
                        />)
                    }
                    {disableNextBtn ?
                        (<DisabledButton
                            label='Next'
                            icon={<FaArrowRight />}
                            iconPosition='right'
                            classNames='label-icon'
                        />) :
                        (<BaseButton
                            label='Next'
                            href={localeHelper.localizedUrl(`/projects/${nextProject.slug}`)}
                            icon={<FaArrowRight />}
                            tooltip={<Tooltip label={nextProject.title} />}
                            classNames='label-icon text-gray-400 hover:text-accent-secondary transition-colors duration-200'
                        />)
                    }

                </div>

            </div>
        </section>
    )

}



