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
`
