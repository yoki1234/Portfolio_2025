import AnimatedBlurBackground from "../Components/AnimatedBlurBackground"
import profilePhoto from "../assets/Profile_DP.png"
import { Icons } from "../Components/Icons"
import { ImageFramming } from "../Components/ImageFramming"


export const Header = () => {
    return (
        <div className="relative w-full h-[543px] flex flex-col items-center justify-between">
            <AnimatedBlurBackground
                fillParent
                count={5}
                opacity={1}
                getShape={(i) => {
                    if (i === 0) return { sides: 0, size: 120, color: "#000", speedScale: 10 };   // big circle
                    if (i === 1) return { sides: 5, size: 90, color: "#000", speedScale: 10 };
                    if (i === 2) return { sides: 3, size: 80, color: "#000", speedscale: 10 };
                    return { sides: 4, size: 120 }; // others: squares, default colors
                }}
            />
            <div className={"p-5 w-full flex flex-col items-end"}>
                <Icons selectedIcon="Menu" className="w-6 h-6 cursor-pointer" />
            </div>
            <ImageFramming imageURL= {profilePhoto} structureSelection = "profile_photo"/>
            <div className="p-5 w-full flex flex-row justify-end">
                <Icons selectedIcon="Instagram" className="w-6 h-6 mr-3 cursor-pointer" />
                <Icons selectedIcon="LinkedIn" className="w-6 h-6 cursor-pointer" />
            </div>

        </div>

    )
}