import {SmallSpacer, Spacer} from "./Spacer";
import {Col, Row} from "react-bootstrap";

export const Swap = ({onClick}) => {
  return (
    <div className="swap">
      <SwapButton/>
      <SwapHeader/>
      <SwapCard/>
      <SmallSpacer/>
      <SwapCard/>
      <Spacer/>
      <ConnectWalletButton onClick={onClick}/>
    </div>
  )
}

const SwapButton = () => {
  return (
    <div className="swapButton">
      <img className="swapButtonImage"
           src="https://assets.website-files.com/5eb07b7b6cc525d375ebb3d4/5eb07b7b6cc525c103ebb480_download%20(1).svg"/>
    </div>
  )
}

const SwapHeader = () => {
  return (
    <div className="swapHeader">
      <p className="swapText">Обменять</p>
      <img className="swapSettings" src="https://cpng.pikpng.com/pngl/s/526-5265469_clip-art-png-download.png"></img>
    </div>
  )
}

const SwapCard = () => {
  return (
    <div className="swapCard">
      <Row className="swapCardBody">
        <Col>
          <Row className="swapCardEntity">
            <Col className="swapCardEntityImage"></Col>
            <Col className="swapCardEntityTitle"></Col>
          </Row>
        </Col>
        <Col>
          <input className="swapCardInput" placeholder="0.0"></input>
        </Col>
      </Row>
    </div>
  )
}

const ConnectWalletButton = ({onClick}) => {
  return (
    <div className="connectWalletButton" onClick={onClick}>
      <p className="connectWalletText">Подключить кошелек</p>
    </div>
  )
}
