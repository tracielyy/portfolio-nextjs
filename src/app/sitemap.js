import { Project } from '@/lib/models/Project.class'
import Language from '@/lib/enums/Language.enum';

const locales = Language.values().map(s => s.value);
const baseUrl = 'https://tracielyy.com';

export default function sitemap() {
  const staticRoutes = locales.map(locale => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: locale === 'en' ? 1 : 0.8,
  }));

  /* Use flatmap due to multiple layers caused by locale */
  const projectRoutes = locales.flatMap(locale =>
    Project.getAllProjects(locale).map(project => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    }))
  );

  return [...staticRoutes, ...projectRoutes];
}