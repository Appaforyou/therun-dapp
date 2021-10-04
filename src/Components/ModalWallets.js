import {Modal} from "react-bootstrap";
import {Card} from "./Card";
import {Spacer} from "./Spacer";

export function ModalWallets(props) {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="customModal"
      >
        <Modal.Header closeLabel="" closeButton className="customModalHeader">
          <Modal.Title id="contained-modal-title-vcenter">
            Подключить кошелёк
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="customModalBody">
          <Card title="MetaMask"
                imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
                description="Easy-to-use browser extension"
                onClick={props.metamaskConnect}/>
          <Spacer/>
          <Card title="WalletConnect"
                imageSrc="https://gblobscdn.gitbook.com/spaces%2F-LJJeCjcLrr53DcT1Ml7%2Favatar.png?alt=media"
                onClick={props.walletConnect}/>
        </Modal.Body>
      </Modal>
    </>
  );
}
