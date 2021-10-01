import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  .customModal {
    width: 430px;
    border-radius: 20px;
  }

  .modal-header .h4 {
    font-size: 16px;
    font-weight: 400;
  }

  .customModalHeader {
    background-color: rgb(25, 27, 31);
    border-bottom: 1px solid rgb(25, 27, 31);
    color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .customModalBody {
    background-color: rgb(25, 27, 31);
    border-top: 1px solid rgb(25, 27, 31);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .modal-content {
    border-radius: 20px;
    background-color: rgb(25, 27, 31);
    border: 1px solid rgba(64, 68, 79);
  }

  .modalCard {
    height: 58px;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(64, 68, 79);
    background-color: rgb(44, 47, 54);
    padding: 16px;
    border-radius: 12px;
  }

  .modalCard:hover {
    border: 1px solid rgb(33, 114, 229);
    cursor: pointer;
  }

  .modalCard:active {
    border: 2px solid rgb(33, 114, 229);
    padding: 15px;
  }

  .modalCard img {
    width: 30px;
    height: 30px;
  }

  .modalCard p {
    font-size: 18px;
    font-weight: 400;
    color: rgb(255, 255, 255);
    margin: 0;
  }

  .spacer {
    display: flex;
    height: 8px;
  }
  
  .smallSpacer {
    height: 4px;
  }

  .swap {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 8px;
    height: 294px;
    width: 480px;
    background-color: rgb(25, 27, 31);
    border-radius: 24px;
  }
  
  .swapCard {
    height: 82px;
    width: 100%;
    background-color: rgb(33, 36, 41);
    border: 1px solid rgba(45, 47, 53);
    border-radius: 20px;
  }
  
  .swapCard:hover {
    border: 1px solid rgba(65, 68, 78);
  }
  
  .connectWalletButton {
    display: flex;
    justify-content: center;
    height: 54px;
    width: 100%;
    background-color: rgb(28, 42, 64);
    border-radius: 20px;
  }
  
  .connectWalletButton:hover {
    background-color: rgb(26, 39, 59);
    cursor: pointer;
  }
  
  .connectWalletButton:active {
    background-color: rgb(25, 36, 55);
  }
  
  .connectWalletText {
    color: rgb(96, 143, 227);
    font-family: sans-serif;
    align-self: center;
    margin-top: 16px;
  }
  
  .swapHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 93%;
    height: 24px;
    margin-bottom: 16px;
  }
  
  .swapText {
    margin-top: 16px;
    font-size: 16px;
    align-self: center;
    color: white;
  }
  
  .swapSettings {
    width: 24px;
    height: 24px;
  }
  
  .swapButton {
    position: absolute;
    bottom: 138px;
    width: 32px;
    height: 32px;
    background-color: rgb(44, 47, 54);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid rgb(25, 27, 31);
    border-radius: 12px;
  }
  
  .swapButton:hover {
    cursor: pointer;
    background-color: rgb(44, 47, 54, 0.85);
    border: 4px solid rgb(25, 27, 31, 0.85);


  }
  
  .swapButtonImage {
    width: 16px;
    height: 16px;
  }
`
