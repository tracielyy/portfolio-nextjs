import { getDictionary } from '@/lib/dictionary';
import { getData } from '@/lib/data';
import { FaTools } from "react-icons/fa";
import { TbDeviceDesktopCode } from "react-icons/tb";

import { ProgressBarWithLabel } from '../ui/ProgressBar';


export default function SkillsToolsSection({ locale }) {
    const dict = getDictionary(locale);
    const skillsToolsData = getData(locale, 'skills-and-tools');

    return (
        <section id="skills" className="section-container">
            <h1 className="section-title">{dict.section.skills.title}</h1>
            <div className='section-content-row'>

                {/* Tools Sub Section */}
                <div className='sub-section-bordered'>
                    <h2 className='sub-section-title'>
                        <span className='flex items-center gap-2'>
                            <FaTools />
                            <span>{dict.section.skills.tools.title}</span>
                        </span>
                    </h2>
                    {/* TODO: List of tools */}
                    {
                        skillsToolsData
                            .filter((item) => (item.type === 'tool'))
                            .map((item) => (
                                <ProgressBarWithLabel key={item.name} label={item.name} progressOverTen={item.rating} />
                            ))
                    }
                </div>

                {/* Skills Sub Section */}
                <div className='sub-section-bordered'>
                    <h2 className='sub-section-title'>
                        <span className='flex items-center gap-2'>
                            <TbDeviceDesktopCode />
                            <span>{dict.section.skills.skills.title}</span>
                        </span>
                    </h2>

                    {skillsToolsData
                        .filter((item) => (item.type !== 'tool' && item.type !== 'soft'))
                        .map((item) => (
                            <ProgressBarWithLabel key={item.name} label={item.name} progressOverTen={item.rating} />
                        ))
                    }

                </div>

            </div>


        </section>

    )
}