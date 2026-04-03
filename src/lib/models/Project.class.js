import { getData } from '@/lib/data';

export class Project {
    constructor({ id, slug, title, description, tags, repo, image, live }) {
        this.id = id;
        this.slug = slug;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.repo = repo;
        this.image = image;
        this.live = live;
    }

    /**
     * Returns all the project data by providing the locale
     * @param locale {string}
     * @return {Array<Project>}
     */
    static getAllProjects(locale) {
        const rawProjectData = getData(locale, 'projects');
        return rawProjectData.map((rawProjectItem) => { return new Project(rawProjectItem); });
    }

    /**
     * Find current project when given id
     * @param locale {string}
     * @param id {number}
     * @returns {Project} project
     */
    static findById(locale, id) {
        const projects = this.getAllProjects(locale);
        return projects.find(proj => proj.id === id);
    }

    /**
     * Find current project when given slug
     * @param locale {string}
     * @param slug {string}
     * @returns {Project | undefined} project
     */
    static findBySlug(locale, slug) {
        const projects = this.getAllProjects(locale);
        return projects.find(proj => proj.slug === slug);
    }

    /**
     * Find previous project when given current project id
     * @param locale {string}
     * @param id {number}
     * @returns {Project} project
     */
    static findPreviousById(locale, id) {
        const projects = this.getAllProjects(locale);
        const foundIndex = projects.findIndex(proj => proj.id === id);
        /* First item and its the only item */
        if (foundIndex === 0 && projects.length === 1) {
            return projects.at(0);
        }
        /* First item but not the only item */
        else if (foundIndex === 0 && projects.length > 1) {
            return projects.at(-1);
        }
        else {
            return projects.at(foundIndex - 1);
        }
    }

    /**
     * Find next project when given current project id
     * @param locale {string}
     * @param id {number}
     * @returns {Project} project
     */
    static findNextById(locale, id) {
        const projects = this.getAllProjects(locale);
        const foundIndex = projects.findIndex(proj => proj.id === id);
        /* Is the only item or the last item */
        if (foundIndex === projects.length - 1 || (foundIndex === projects.length -1 && projects.length > 1)) {
            return projects.at(0);
        }
        else {
            return projects.at(foundIndex + 1);
        }
    }


}