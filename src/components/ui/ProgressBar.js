

export default function ProgressBar({ progressOverTen }) {
    return (
        <div className="w-full bg-slate-border rounded-full h-2">
            <div
                className="h-2 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                style={{ width: `${(progressOverTen / 10) * 100}%` }}
            ></div>
        </div>

    )
}

export function ProgressBarWithLabel({ key, label, progressOverTen }) {

    return (
        <div key={`${key}-child`} className='flex flex-row gap-2 mx-auto w-full items-center justify-between'>
            <span>{label}</span>
            <ProgressBar progressOverTen={progressOverTen} />
        </div>
    )
}