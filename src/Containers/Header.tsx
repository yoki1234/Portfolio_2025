import { Icons } from "../Components/Icons"
import { ImageFrame } from "../Components/ImageFrame"
import BlurAnimWrapper from "../Components/BlurAnimWrapper"
import { HamburgerMenu } from "../Components/HamburgerMenu";


type Headerprop = {
    imageURL: string;
}

export const Header = ({ imageURL }: Headerprop) => {
    return (

        <BlurAnimWrapper colors={["#000", "#000", "#000"]}>
            <div className="p-5 w-full h-[543px] flex flex-col items-center justify-between">
                <div className={"w-full flex flex-col items-end"}>
                    <HamburgerMenu isOpen={false} handleClick={() => console.log("Button_clicked")}/>
                </div>
                <ImageFrame imageURL={imageURL} structureSelection="profile_photo" />
                <div className="w-full flex flex-row justify-end">
                    <Icons selectedIcon="Instagram" className="w-6 h-6 mr-3 cursor-pointer" isBackgroundDark={false}/>
                    <Icons selectedIcon="LinkedIn" className="w-6 h-6 cursor-pointer" isBackgroundDark={false}/>
                </div>
            </div>
        </BlurAnimWrapper >


    )
}