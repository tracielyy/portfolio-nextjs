import { Tooltip } from "./Tooltip/Tooltip"

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
        <div key={`${key}-child`} className='flex flex-row gap-2 w-full items-center'>
            <div className='relative w-24 shrink-0 group'>
                <span className='text-sm text-gray-400 w-24 block truncate cursor-default'>{label}</span>
                <Tooltip label={label} />
            </div>
            {/* <span className="text-sm text-gray-400 w-24 shrink-0 truncate" title={label}>{label}</span> */}
            <div className='flex-1 min-w-0'>
                <ProgressBar progressOverTen={progressOverTen} />
            </div>
        </div>
    )
}