export class LocaleHelper {
    constructor(pathname) {
        this.pathname = pathname;
    }

    getCurrentLocale = () => {
        const segments = this.pathname.split('/').filter(Boolean);
        if (segments.length > 0) {
            const firstSegment = segments[0];
            if (firstSegment === 'en' || firstSegment === 'zh') {
                return firstSegment;
            }
        }
        return 'en'; // Default
    };

    localizedUrl = (path) => {
        const currentLocale = this.getCurrentLocale();
        return `/${currentLocale}${path}`;
    }

}
