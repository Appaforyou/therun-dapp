import {useEffect, useState} from "react";
import {ethers} from "ethers";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {Container} from "react-bootstrap";
import {ModalWallets} from "./Components/ModalWallets";
import {GlobalStyles} from "./Styles/GlobalStyles";
import {SmallSpacer, Spacer} from "./Components/Spacer";

function App() {
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState('');
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
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      setAccount('');
      console.log('disconnectEvent');

      // Delete connector
    });
  }

  function setState(accountState, networkState, balanceState) {
    setAccount(accountState);
    setNetwork(networkState);
    setBalance(balanceState);
  }

  async function loadBlockchainData(provider) {
    await window.ethereum.send('eth_requestAccounts');
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    setState(address, (await provider.getNetwork()).name, (await provider.getBalance(address)).toString())

    window.ethereum.on('accountsChanged', accounts => {
      if (accounts[0]) {
        setState(accounts[0], (provider.getNetwork()).name, (provider.getBalance(address)).toString());
      } else {
        setState('', '', '');
      }
    });
  }

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      loadBlockchainData(provider);
    }
  }, [])

  return (
    <>
      <GlobalStyles/>
      <Container>
        {network !== '' && (<p>Network: {network}</p>)}
        {account !== '' && (<p>Your accounts: {account}</p>)}
        {balance !== '' && (<p>Your balance: {balance}</p>)}
        {status !== '' && (<p>Status: {status}</p>)}
        <ModalWallets
          show={modalShow}
          onHide={() => setModalShow(false)}
          walletConnect={walletConnect}
          loadBlockchainData={loadBlockchainData}
        />
        <Swap onClick={() => setModalShow(true)}/>
      </Container>
    </>
  )
}

const Swap = ({onClick}) => {
  return (
    <div className="swap">
      <SwapButton />
      <SwapHeader />
      <SwapCard/>
      <SmallSpacer />
      <SwapCard/>
      <Spacer/>
      <ConnectWalletButton onClick={onClick}/>
    </div>
  )
}

const SwapButton = () => {
  return (
    <div className="swapButton">
      <img className="swapButtonImage" src="https://assets.website-files.com/5eb07b7b6cc525d375ebb3d4/5eb07b7b6cc525c103ebb480_download%20(1).svg"/>
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
    <div className="swapCard"></div>
  )
}

const ConnectWalletButton = ({onClick}) => {
  return (
    <div className="connectWalletButton" onClick={onClick}>
      <p className="connectWalletText">Подключить кошелек</p>
    </div>
  )
}

export default App;
