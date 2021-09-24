import {useEffect, useState} from "react";
import {ethers} from "ethers";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {Button, Container} from "react-bootstrap";


function App() {
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState('');
  const [chainId, setChainId] = useState('');

  const [status, setStatus] = useState('');


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
      }} variant="primary">WalletConnect</Button>{' '}
    </Container>
  )
}

export default App;
