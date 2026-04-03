import Link from 'next/link'
import Image from 'next/image'
import { BadgesDisplay } from '@/components/ui/Badge'

export default function ProjectCard({ locale, project }) {
  return (
    <Link href={`/${locale}/projects/${project.slug}`}>
      <div className="bg-slate-card border border-transparent hover:border-accent-secondary rounded-lg overflow-hidden transition-colors duration-200">
        <Image
          src={`/images/projects/${project.image}`}
          alt={project.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-heading text-lg font-semibold mb-1">{project.title}</h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-4">{project.description}</p>
          <BadgesDisplay labelArray={project.tags} />
        </div>
      </div>
    </Link>
  );
}