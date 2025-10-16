import data from "../portfolioDatabase.json"
import { Header } from "../Containers/Header"
import { IntroductionSection } from "../Containers/IntroductionSection"
import { ImageSelection } from "../Components/ImageSelection"

const mobileData = data.portfolioDataset.mobileData

function Home() {

  return (
    <>
      <Header imageURL={ImageSelection.avatar} />
      <IntroductionSection content={mobileData.Introduction.textContent} pillImage={ImageSelection.pill.pillImageOne}/>
    </>
  )
}

export default Home