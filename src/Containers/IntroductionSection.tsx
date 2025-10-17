import { Pills } from "../Components/Pills";
import introImageOne from "../assets/introImage_1.png";
import type { introductionParagraphProps } from "../DataTypes";


export const IntroductionSection = ({ content, pillImage}: introductionParagraphProps) => {
    const introPara = content.map((sentence) => {
        return (
            <p className="w-full text-base leading-7 ">
                {sentence.sentenceOne} <span className="font-semibold text-slate-900">{sentence.sentenceTwo}</span> {sentence.sentenceThree}{" "}
                {sentence.sentenceFour} <Pills imageSrc={pillImage} />
                {sentence.sentenceFive}
            </p>
        );
    });

    return (
        <section>
            {introPara}
        </section>

    );
};