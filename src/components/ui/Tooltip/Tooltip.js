export function Tooltip({ label }) {
    return (
        <div className='absolute bottom-full left-0 mb-2 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10
    bg-slate-card border border-accent-primary text-accent-secondary text-xs font-medium'>
            {label}
        </div>
    )
}