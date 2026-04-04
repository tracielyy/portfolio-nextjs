import Link from 'next/link'
import Image from 'next/image'
import { BadgesDisplay } from '@/components/ui/Badge'
import { FaImage } from 'react-icons/fa'


export default function ProjectCard({ locale, project }) {
  return (
    <Link href={`/${locale}/projects/${project.slug}`} className="h-full">
      <div className="h-full flex flex-col bg-slate-card border border-transparent hover:border-accent-secondary rounded-lg overflow-hidden transition-colors duration-200">
        {project.image ? (
          <Image
            src={`/images/projects/${project.image}`}
            alt={project.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 object-cover bg-[#161A22] flex flex-col items-center justify-center gap-2 text-gray-600">
            <FaImage size={32} />
            <span className="text-xs">No image available</span>
          </div>
        )}



        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-heading text-lg font-semibold mb-1">{project.title}</h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-4">{project.description}</p>

          <div className="mt-auto">

            <BadgesDisplay labelArray={project.tags} />
          </div>
        </div>
      </div>
    </Link>
  );
}