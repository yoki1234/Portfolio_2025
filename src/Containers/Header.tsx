import AnimatedBlurBackground from "../Components/AnimatedBlurBackground"
import menuIcon from "../assets/Menu.svg"
import profilePhoto from "../assets/Images/DP.png"
import linkedInIcon from "../assets/LinkedIn.svg"
import instagramIcon from "../assets/Instagram.svg"


export const Header = () => {
    return(
        <div className="relative w-full h-[543px] flex flex-col items-center justify-between">
            <AnimatedBlurBackground  
            fillParent
            count={5}
            opacity={1}
            getShape={(i) => {
                if (i === 0) return { sides: 0, size: 120, color: "#3aaf1aff",speedScale: 10 };   // big circle
                if (i === 1) return { sides: 5, size: 90, color: "#10cdefff", speedScale: 10 };
                if (i === 2) return {sides: 3, size:80, color:"#f2620eff", speedscale: 10};
                return { sides: 4, size: 120 }; // others: squares, default colors
                }}
                />
                <div className="p-5 w-full flex flex-col items-end">
                    <img src={menuIcon} alt="menu_icon"  className="w-xs h-xs"/>
                </div>
                <div className="w-[320px] h-[320px] bg-[rgba(34,43,89,.6)] rounded-full relative">
                    <img src={profilePhoto} alt="dp_photo" className=" absolute bottom-1 left-1" />
                </div>
                <div className="p-5 w-full flex flex-row justify-end">
                    <img src={instagramIcon} alt="insta_icon"  className="w-xs h-xs px-5"/>
                    <img src={linkedInIcon} alt="linkedin_icon"  className="w-xs h-xs"/>
                </div>
        </div>
        
        )
}