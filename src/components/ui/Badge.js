export default function Badge({ label }) {

    return (
        <span className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold leading-none bg-slate-card border border-slate-border text-accent-secondary rounded-md">
            {label}
        </span>
    )
}

export function BadgesDisplay({ labelArray, className }) {
    return (
        <div className="flex gap-2 flex-wrap mt-3 ${className ?? ''}">
            {labelArray.map((label, index) => (
                <Badge key={index} label={label} />
            ))}
        </div>
    );
}

