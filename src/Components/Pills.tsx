import type { PillProps } from "../DataTypes"

export const Pills = ({ imageSrc, className }: PillProps) => {
    return (
        <span
            className={
                `relative inline-block align-middle h-7 w-auto mx-1 rounded-full overflow-hidden ` +
                `before:content-[''] before:absolute before:inset-0 before:rounded-full before:pointer-events-none ` +
                `before:shadow-[inset_0_6px_12px_rgba(0,0,0,0.18),inset_0_-3px_6px_rgba(255,255,255,0.16)] ` +
                className
            }
            aria-hidden="true"
        >
            <img src={imageSrc} alt="" className="h-full w-full object-cover" />
        </span>

    )
}
