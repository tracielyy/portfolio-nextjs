import { getData } from '@/lib/data';
import Language from '@/lib/enums/Language.enum.js';

/**
 * @typedef {Object} BasicData
 * @property {string} display_name
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} alias
 * @property {string} occupation
 * @property {string} location
 * @property {string} bio
 * @property {string} email
 * @property {string[]} interest
 */

export class Basic {

    /**
     * @param {BasicData} data 
     */
    constructor({ display_name, first_name, last_name, alias, occupation, location, bio, email, interest }) {
        this.display_name = display_name;
        this.first_name = first_name;
        this.last_name = last_name;
        this.alias = alias;
        this.occupation = occupation;
        this.location = location;
        this.bio = bio;
        this.email = email;
        this.interest = interest;
    }

    /**
     * Returns all the basic data by providing the locale
     * @param locale {string}
     * @return {Basic}
     */
    static getBasic(locale) {
        const rawBasicData = getData(locale, 'basic');
        return new Basic(rawBasicData);
    }

    /**
     * Returns the full name in different sequence according to the language choosen
     * @param {string} locale
     * @returns {string} full name
     */
    getFullName(locale) {
        if (locale === Language.EN.toString())
            return `${this.first_name} ${this.last_name}`;
        else
            return `${this.last_name}${this.first_name}`;
    }
}