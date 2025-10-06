
type structureName = "profile_photo" | "not_profile_photo"

type ImageFrammingProps = {
    imageURL: string;
    structureSelection: structureName;
}

export const ImageFramming = ({ imageURL, structureSelection }: ImageFrammingProps) => {
    return(
    <>{
        structureSelection === "profile_photo" ?
        <div className="w-[320px] h-[320px] bg-[rgba(34,43,89,.6)] rounded-full relative">
            <img src={imageURL} alt="dp_photo" className=" absolute bottom-1 left-1" />
        </div> :
        structureSelection === "not_profile_photo" ?
        <div className="w-[320px] h-[320px] bg-[rgba(34,43,89,.6)] rounded-full relative">
            <img src={imageURL} alt="dp_photo" className=" absolute bottom-1 left-1" />
        </div> : " "
    }</>
)

}