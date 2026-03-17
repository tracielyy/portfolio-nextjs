import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

// Auto-generate string mapping from icon libraries
const generateIconMap = (iconLib, prefix = '') => {
    const map = {};
    Object.keys(iconLib).forEach(key => {
        if (key.startsWith(prefix)) {
            // Remove prefix and convert to lowercase
            const name = key.replace(prefix, '').toLowerCase();
            map[name] = iconLib[key];
        }
    });
    return map;
};

// Generate maps for different libraries
const faIconMap = generateIconMap(FaIcons, 'Fa');
const mdIconMap = generateIconMap(MdIcons, 'Md');

// Combine all maps
const autoIconMap = {
    ...faIconMap,
    ...mdIconMap,
};

const AutoMappedIcon = ({ iconName, ...props }) => {
    const IconComponent = autoIconMap[iconName.toLowerCase()];

    if (!IconComponent) {
        console.warn(`Icon "${iconName}" not found in auto-generated map`);
        return null;
    }

    return <IconComponent {...props} />;
};

export default function Socials({ socialsData, className }) {
    // const socialsData = getData(locale, 'socials');
    return (
        <div className="mt-4 pt-4 text-center">
            {/* Need to loop social data */}
            <ul className={`flex flex-row ${className} gap-4 md:gap-6 space-y-2`}> {/* Single line with responsive gap */}
                {/* <ul className={`flex flex-row ${className} gap-4 md:gap-6 space-y-2 `}> Single line with responsive gap */}
                {socialsData.map((social) => (
                    <li key={social.id}>
                        <a href={social.url} target="_blank" rel="noopener noreferrer"
                            className="iinline-block p-2 hover:scale-110 transition-transform duration-200 text-gray-400 hover:text-accent-secondary site-links">
                            <AutoMappedIcon iconName={social.icon.component}
                                className="w-5 h-5 md:w-6 md:h-6" /> {/* Responsive icon size */}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}