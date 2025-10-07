import { Pills } from "../Components/Pills";
import introImageOne from "../assets/introImage_1.png";

export const IntroductionSection = () => {
  return (
    <section className="max-w-prose text-slate-700">
      <p className="text-base leading-7">
        Hey there, I’m <span className="font-semibold text-slate-900">Akshay Ashok</span> 👋{" "}
        I love <Pills imageSrc={introImageOne} />
        exploring data and turning it into meaningful stories. With a background in
        software development and a master&apos;s in Data Analytics, I combine
        technical skill with visual creativity.
      </p>
    </section>
  );
};