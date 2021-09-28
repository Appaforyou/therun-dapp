import {useEffect, useState} from "react";
import {ethers} from "ethers";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {Button, Container, Modal} from "react-bootstrap";
import {createGlobalStyle} from 'styled-components';

function App() {
    const [account, setAccount] = useState('');
    const [network, setNetwork] = useState('');
    const [balance, setBalance] = useState('');
    const [chainId, setChainId] = useState('');
    const [status, setStatus] = useState('');

    const [modalShow, setModalShow] = useState(false);


    async function walletConnect() {
        // Create a connector
        const connector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org", // Required
            qrcodeModal: QRCodeModal,
        });

        // Check if connection is already established
        if (!connector.connected) {
            // create new session
            connector.createSession().then((r) => {
                console.log('createSession');
            }).catch(err => {
                console.log(err);
            });
        }

        // Subscribe to connection events
        connector.on("connect", (error, payload) => {
            if (error) {
                throw error;
            }

            // Get provided accounts and chainId
            const {accounts, chainId} = payload.params[0];
            console.log('connectEvent');
            console.log('accounts, chainId');
            setAccount(accounts[0]);
            setChainId(chainId);
            console.log(payload.params);

        });

        connector.on("session_update", (error, payload) => {
            if (error) {
                throw error;
            }

            // Get updated accounts and chainId
            const {accounts, chainId} = payload.params[0];
            console.log('sessionUpdateEvent');
            setAccount(accounts[0]);
            setChainId(chainId);
        });

        connector.on("disconnect", (error, payload) => {
            if (error) {
                throw error;
            }
            setAccount('');
            setChainId('');
            console.log('disconnectEvent');

            // Delete connector
        });
    }


    async function loadBlockchainData(provider) {
        await window.ethereum.send('eth_requestAccounts');
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        window.ethereum.on('accountsChanged', accounts => {
            setAccount(accounts[0] ?? '');
        });
        setAccount(address);
        setNetwork((await provider.getNetwork()).name);
        setBalance((await provider.getBalance(address)).toString());
    }

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            loadBlockchainData(provider);
            return provider.removeAllListeners();
        }
    }, [])

    return (
        <Container>
            <h1>Hello</h1>
            {network !== '' && (<p>Network: {network}</p>)}
            {account !== '' && (<p>Your accounts: {account}</p>)}
            {balance !== '' && (<p>Your balance: {balance}</p>)}
            {status !== '' && (<p>Status: {status}</p>)}
            {chainId !== '' && (<p>ChainId: {chainId}</p>)}
            <Button onClick={() => {
                walletConnect();
            }}>WalletConnect</Button>{' '}
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Подключить кошелек
            </Button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    )
}

export default App;

function MyVerticallyCenteredModal(props) {
    return (
        <>
            <GlobalStyles/>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="customModal"
            >
                <Modal.Header closeButton className="customModalHeader">
                    <Modal.Title id="contained-modal-title-vcenter">
                        Подключить кошелёк
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="customModalBody">
                    <div className="modalCard" onClick={() => {
                    }}>
                        <p>MetaMask</p>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"/>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

const GlobalStyles = createGlobalStyle`
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
`