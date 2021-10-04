import {useState} from "react";
import {ethers} from "ethers";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {Container} from "react-bootstrap";
import {ModalWallets} from "./Components/ModalWallets";
import {GlobalStyles} from "./Styles/GlobalStyles";
import {Swap} from "./Components/Swap";

function App() {
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState('');

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
      const {accounts} = payload.params[0];
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
      const {accounts} = payload.params[0];
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

  async function metamaskConnect() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.send('eth_requestAccounts');
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);
      setNetwork((await provider.getNetwork()).name);
      setBalance((await provider.getBalance(address)).toString());

      window.ethereum.on('accountsChanged', accounts => {
        if (accounts[0]) {
          setAccount(accounts[0]);
          setNetwork((provider.getNetwork()).name);
          setBalance((provider.getBalance(address)).toString());
        } else {
          setAccount('');
          setNetwork('');
          setBalance('');
        }
      });
    }
  }

  return (
    <>
      <GlobalStyles/>
      <Container className="app">
        <div className="bigSpacer"></div>
        <ModalWallets
          show={modalShow}
          onHide={() => setModalShow(false)}
          walletConnect={walletConnect}
          metamaskConnect={metamaskConnect}
        />
        <Swap onClick={() => setModalShow(true)}/>
        {network !== '' && (<p className="text-white">Network: {network}</p>)}
        {account !== '' && (<p className="text-white">Your accounts: {account}</p>)}
        {balance !== '' && (<p className="text-white">Your balance: {balance}</p>)}
        <div className="bigSpacer"></div>
        <div className="bigSpacer"></div>
      </Container>
    </>
  )
}

export default App;
