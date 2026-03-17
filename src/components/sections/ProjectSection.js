import ProjectCard from '@/components/ProjectCard'
import { getDictionary } from '@/lib/dictionary';
import { Project } from '@/lib/models/Project.class';

export default function ProjectSection({ locale }) {
  const projects = Project.getAllProjects(locale);
  const dict = getDictionary(locale);

  return (
    <section id="projects" className="section-container">
      <h1 className="section-title">{dict.section.projects.title}</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </section>
  )
}