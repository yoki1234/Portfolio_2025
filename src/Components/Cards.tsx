import { ButtonComponent } from "./ButtonComponent"
import type { CarouselCardsProps } from "../DataTypes"
import classNames from "classnames"

export const Cards = ({ title, description, imageURL, btnLabel, isCarouselCard }: CarouselCardsProps) => {

    const cardContainerStyle = classNames('w-full flex items-center rounded-2xl overflow-hidden', {
        'flex-row h-[303px] bg-CardGray': isCarouselCard,
        'flex-col h-[450px] bg-CardLightBlue': !isCarouselCard,
    })

    const cardImageStyle = classNames('bg-cover bg-center h-full overflow-hidden shadow-lg', {
        'w-[240px]': isCarouselCard,
        'w-full': !isCarouselCard
    })

    const cardContentStyle = classNames('w-full flex flex-col items-end justify-between leading-none p-4 text-white', {
        'h-full text-white': isCarouselCard,
        'h-[700px] text-CardGray': !isCarouselCard,
    })


    return (
        <div className={cardContainerStyle}>
            <div className={cardImageStyle} style={{ backgroundImage: `url(${imageURL})` }} />
            <div className={cardContentStyle}>
                <div className="text-2xl text-left font-bold ">{title}</div>
                <div className="h-fit text-base leading-1 line-clamp-5">{description}</div>
                <ButtonComponent buttonText={btnLabel} handleClick={() => alert("Button_clicked")} />
            </div>
        </div>
    )
}