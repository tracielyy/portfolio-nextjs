import { getData } from '@/lib/data';
import { DateUtil } from '@/lib/utils/dateUtil';


/**
 * @typedef {Object} ExperienceData
 * @property {number} id
 * @property {string} job_title
 * @property {string} employment_type
 * @property {string} location
 * @property {Object} start
 * @property {Object} end
 * @property {string} organisation
 * @property {string} summary
 * @property {string[]} description_points
 * @property {string} website
 * @property {string[]} tags
 * @property {boolean} is_current_role
 */

export class Experience {

    /**
     * @param {ExperienceData} data
     */
    constructor({ id, job_title, employment_type, location, start, end,
        organisation, summary, description_points, website, tags, is_current_role }) {
        console.log("startyear", start.year);
        this.id = id;
        this.jobTitle = job_title;
        this.employmentType = employment_type;
        this.location = location;
        this.start = new DateUtil({ year: start.year, month: start.month, day: start.day });
        this.end = new DateUtil({ year: end.year, month: end.month, day: end.day });
        this.organisation = organisation;
        this.summary = summary;
        this.descriptionPoints = description_points;
        this.website = website;
        this.tags = tags;
        this.isCurrentRole = is_current_role;
    }

    /**
     * Returns a formatted experience duration
     * @returns {string} Experience Duration
     */
    displayExperienceDuration() {
        const endDisplay = this.end.year !== null ? this.end.displayYearMonth() : 'Present';
        return `${this.start.displayYearMonth()} - ${endDisplay}`;
    }

    /**
     * Returns all the work experience data by providing the locale
     * @param locale {string}
     * @return {Array<Experience>}
     */
    static getAllExperiences(locale) {
        const rawExperienceData = getData(locale, 'experiences');
        return rawExperienceData.map((rawExp) => { return new Experience(rawExp); });
    }


    /**
     * Find current experience when given id
     * @param locale {string}
     * @param id {number}
     * @returns {Experience} experience
     */
    static findById(locale, id) {
        const experiences = this.getAllExperiences(locale);
        return experiences.find(exp => exp.id === id);
    }

}