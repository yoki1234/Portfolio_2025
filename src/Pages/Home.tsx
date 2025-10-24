import data from "../portfolioDatabase.json"
import { Header } from "../Containers/Header"
import { IntroductionSection } from "../Containers/IntroductionSection"
import { ImageSelection } from "../Components/ImageSelection"
import { Cards } from "../Components/Cards"
import { HamburgerMenu } from "../Components/HamburgerMenu"


const mobileData = data.portfolioDataset.mobileData

function Home() {

  return (
    <>
      <Header imageURL={ImageSelection.avatar} />
      <IntroductionSection content={mobileData.Introduction.textContent} pillImage={ImageSelection.pill.pillImageOne} />
      <Cards imageURL={ImageSelection.cardImageBlog}
        title={mobileData.Card.cardContent.cardTitle}
        description={mobileData.Card.cardContent.cardinfo}
        btnLabel={mobileData.Card.cardContent.btnLabel}
        isCarouselCard={mobileData.Card.isNotCarouselCard} />
    </>
  )
}

export default Home