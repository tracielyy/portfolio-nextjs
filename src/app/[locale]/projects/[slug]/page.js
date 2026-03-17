import { getDictionary } from '@/lib/dictionary';
import { notFound } from 'next/navigation';
import { TbArrowBackUp } from "react-icons/tb";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


import Image from 'next/image'
import { BadgesDisplay } from '@/components/ui/Badge'
import { ButtonWithIcon, BaseButton, DisabledButton } from '@/components/ui/Buttons/Button'
import { LocaleHelper } from '@/lib/utils/localehelper';
import { Project } from '@/lib/models/Project.class';

export default async function ProjectPage({ params }) {
    const { locale, slug } = await params;
    // const projects = Project.getAllProjectData(locale);
    const currentProject = Project.findBySlug(locale, slug);
    const prevProject = Project.findPreviousById(locale, currentProject.id);
    const nextProject = Project.findNextById(locale, currentProject.id);

    const disablePrevBtn = currentProject.id === prevProject.id;
    const disableNextBtn = currentProject.id === nextProject.id;

    const localeHelper = new LocaleHelper(`/${locale}`);

    // Handle missing projects
    if (!currentProject) {
        notFound(); // Shows 404 page
    }

    return (
        <section className="page-container">

            {/* Shared width container */}
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
                <h1 className="section-title">{currentProject.title}</h1>
                {/* Back Button */}
                <div className='flex flex-col items-start w-full'>
                    <BaseButton
                        label='Back'
                        href={localeHelper.localizedUrl('/#projects')}
                        icon={<TbArrowBackUp />}
                        classNames='label-icon text-gray-400 hover:text-accent-secondary transition-colors duration-200'
                    />
                </div>


                {/* Project Image */}
                <Image
                    src={`/images/projects/${currentProject.image}`}
                    alt={currentProject.title}
                    width={400}
                    height={250}
                    className="w-full rounded-lg"
                />

                {/* Project Content */}
                <div className='w-full page-content'>
                    {/* TODO: Add Descriptions */}
                    <p className="text-gray-400 text-sm leading-relaxed">{currentProject.description}</p>
                    {/* TODO: Add Link To Website */}
                    {/* TODO: Add Tags */}
                    <BadgesDisplay labelArray={currentProject.tags} />

                </div>

                {/* Route Between Previous and Next */}
                <div className='flex items-start justify-between w-full pt-8'>
                    {disablePrevBtn ?
                        (<DisabledButton label='Prev' icon={<FaArrowLeft />} classNames='label-icon' />) :
                        (<BaseButton label='Prev' href={localeHelper.localizedUrl(`/projects/${prevProject.slug}`)}
                            icon={<FaArrowLeft />} classNames='label-icon text-gray-400 hover:text-accent-secondary transition-colors duration-200'
                        />)
                    }
                    {disableNextBtn ? (<DisabledButton label='Next' icon={<FaArrowLeft />} classNames='label-icon' />) :
                        (<BaseButton label='Next' href={localeHelper.localizedUrl(`/projects/${nextProject.slug}`)}
                            icon={<FaArrowRight />} classNames='label-icon text-gray-400 hover:text-accent-secondary transition-colors duration-200'
                        />)
                    }

                </div>

            </div>
        </section>
    )

}



