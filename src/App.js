import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from "react";
import {ethers} from "ethers";

function App() {
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState('');

  async function loadBlockchainData() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.send('eth_requestAccounts');
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      setNetwork((await provider.getNetwork()).name);
      setBalance((await provider.getBalance(address)).toString())
    }
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <h1>Hello world</h1>
      <p>Network: {network}</p>
      <p>Your accounts: {account}</p>
      <p>Your balance: {balance}</p>
    </div>
  )
}

export default App;
