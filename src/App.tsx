import {Header} from "./Containers/Header"
import { IntroductionSection } from "./Containers/IntroductionSection"

import { ButtonComponent } from "./Components/ButtonComponent"

function App() {

  return (
    <>
      <Header />
      <IntroductionSection />
      <ButtonComponent buttonText={"hello"} handleClick={()=> alert("Button_clicked")}/>

    </>
  )
}

export default App
