import { ButtonComponent } from "./ButtonComponent"


type CarouselCardsProps = {
    title: String,
    description:String,
    imageURL: String,
}


export const CarouselCards = ({title, description, imageURL}: CarouselCardsProps) => {
    return(
        <div className="w-full h-[303px] flex flex-row items-center rounded-2xl bg-cardGray overflow-hidden">
            <div className="bg-cover bg-center w-[133px] h-full overflow-hidden shadow-lg" style={{ backgroundImage: `url(${imageURL})` }} />
            <div className="w-full h-full flex flex-col items-end justify-between leading-none p-4 text-white">
                <div className="text-2xl text-left font-bold ">{title}</div>
                <div className="h-fit text-base leading-1 line-clamp-5">{description}</div>
                <ButtonComponent buttonText={"Read more"} handleClick={()=> alert("Button_clicked")}/>
            </div>

        </div>
    )
}