import Link from 'next/link';

export function BaseButton({ label, href, download = false, external = false, tooltip, icon, iconPosition = 'left', classNames, ...props }) {
    const Component = external ? 'a' : Link;
    return (
        <Component
            href={href}
            download={download}
            className={`btn-base relative group ${classNames}`}
            {...props}
        >
            {iconPosition === 'right' ? (
                <>
                    {tooltip && tooltip}
                    {label}
                    {icon && icon}
                </>
            ) : (
                <>
                    {tooltip && tooltip}
                    {icon && icon}
                    {label}
                </>
            )}
        </Component>
    );
}

export function DisabledButton({ label, icon, iconPosition = 'left', classNames, ...props }) {
    return (
        <span
            className={`btn-base btn-disabled ${classNames}`}
            {...props}
        >
            {iconPosition === 'right' ? (
                <>
                    {label}
                    {icon && icon}
                </>
            ) : (
                <>
                    {icon && icon}
                    {label}
                </>
            )}
        </span>
    )
}

export function BorderOnlyButton({ label, href, download = false, classNames, ...props }) {
    return (
        <BaseButton label={label} href={href} download={download}
            classNames={`btn-border ${classNames}`} {...props} />
    );
}

export function ButtonWithIcon({ label, href, download = false, icon, classNames, ...props }) {

    return (
        <Link
            href={href}
            download={download}
            className={`btn-base ${classNames}`}
            {...props}
        >
            {icon}
            {label}
        </Link>
    );
}