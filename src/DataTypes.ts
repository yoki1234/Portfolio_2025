type ButtonComponentProps = {
    buttonText : String;
    handleClick : ()=> void;
}


type CarouselCardsProps = {
    title: string,
    description:string,
    imageURL: string,
    btnLabel: string,
    isCarouselCard: boolean,
}

type IconName = "Menu" | "LinkedIn" | "Instagram";

type IconsProps = {
  selectedIcon: IconName;
  className?: string;       
  size?: number;             
  title?: string; 
  FocusColor?: string;          
};


type structureName = "profile_photo" | "not_profile_photo"

type ImageFrameProps = {
    imageURL: string;
    structureSelection: structureName;
}

type PillProps = {
    imageSrc: string;
    className?:string;
};

type introductionParagraph = {
    sentenceOne: string,
    sentenceTwo: string,
    sentenceThree: string,
    sentenceFour: string,
    sentenceFive: string,
}

type introductionParagraphProps = {
    content: introductionParagraph[],
    pillImage: string,
};


export type {
    PillProps,
    ImageFrameProps,
    ButtonComponentProps,
    CarouselCardsProps,
    IconsProps,
    introductionParagraphProps,
}

