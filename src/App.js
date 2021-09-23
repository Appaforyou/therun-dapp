import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from "react";
import Web3 from "web3";


function App() {
  const [accounts, setAccounts] = useState([]);

  async function loadBlockchainData() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.send('eth_requestAccounts');
      const network = await web3.eth.net.getNetworkType();
      console.log('network', network);
      const accounts = await web3.eth.getAccounts();
      console.log('accounts', accounts);
      setAccounts(accounts)
    }
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <h1>Hello world</h1>
      <p>Your accounts: {accounts}</p>
    </div>
  )
}

export default App;
