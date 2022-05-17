import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Web3 from "web3";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(window.ethereum);
  const [chainId, setChainId] = useState(null);
  const [web3, setWeb3] = useState(null);

  
  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
    setProvider(provider);
    setWeb3(web3);
      setChainId(chainId);
      setCurrentAccount(accounts[0]);
     setIsConnected(true);
    }
  };

  useEffect(() => {
    // for account change
    const handleAccountsChanged = async (accounts) => {
      const web3Accounts = await web3.eth.getAccounts();
      if (web3Accounts.length === 0) {
        onLogout();
      } else if (web3Accounts[0] !== currentAccount) {
        setCurrentAccount(web3Accounts[0]);
      }
    };
// for chanin id network
    const handleChainChanged = async (chainId) => {
      const web3ChainId = await web3.eth.getChainId();
      setChainId(web3ChainId);
    };

  //  if (isConnected) {
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
 //   }
  }, [isConnected]);
//log
  const onLogout = () => {
    setIsConnected(false);
    setCurrentAccount(null);
    setChainId(null)
  };  
 /*const transfer=(currentAccount)=>{
    let   web3 = new Web3();
    const myContract = new web3.eth.Contract(abi,address);
  myContract.methods.approve(address,"1").send({
    from: currentAccount[0],
    to: address,
    value:  web3.utils.toWei('1', 'ether')
    }).then(transactionHash=> alert(transactionHash)).catch(error=>alert(error));
  }

    const transfer=() =>{
      let   web3 = new Web3();
      const web3Accounts =  web3.eth.getAccounts();
      const myContract = new web3.eth.Contract(abi,address);
      myContract.methods.allowance(address,web3Accounts).call()
     }
     */
  return (
    <div>
      <header className="main-header">
        <nav className="nav">
          <button className="center" onClick={onLogout}> Logout</button>
        </nav>
      </header>
      <main>
        {!isConnected && <Login onLogin={onLogin} />}

        <h1>Account address:{currentAccount}</h1>
        <h1>Current Network Id:{chainId}</h1>

      </main>
    </div>
  );
}

export default App;
