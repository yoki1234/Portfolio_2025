import { Icons } from "../Components/Icons"
import type { FooterProps } from "../DataTypes"


export const Footer = ({ footerContents }: FooterProps) => {
    return (
        <div className="flex flex-col bg-black p-4 gap-5">
            <div>
                {footerContents.map(item => <div className="text-white"> {item}</div>)}
            </div>
            <div className="flex items-center justify-end gap-2 ">
                <Icons selectedIcon="LinkedIn" isBackgroundDark/>
                <Icons selectedIcon="Instagram" isBackgroundDark/>
            </div>
        </div>
    )
}