export class DateUtil {

    constructor({ year, month, day }) {
        console.log("year", year);
        this.year = year;
        this.month = month;
        this.day = day;
    }

    displayYearMonth() {
        if (this.year !== 0 && this.month !== 0)
            return `${this.year} ${DateUtil.getMonthShortName(this.month)}`;
        return `${this.year} ${this.month}`;
    }

    static getMonthShortName(monthNum) {
        const date = new Date(2000, monthNum - 1, 1);
        const monthShortName = date.toLocaleString('en-SG', { month: 'short' });
        return monthShortName;
    }
}
