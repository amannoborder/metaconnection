import { useState, useEffect } from "react";

const Login = (props) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState(window.ethereum);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    setProvider(detectProvider());
  }, []);

  useEffect(() => {
    if (provider) {
      if (provider !== window.ethereum) {
        alert(
          "Not window.ethereum provider"
        );
      }
      setIsMetaMaskInstalled(true);
    }
  }, [provider]);

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      alert("no eth detected");
    }
    return provider;
  };

  const onLoginHandler = async () => {
    setIsConnecting(true);
    await provider.request({
      method: "eth_requestAccounts",
    });
    setIsConnecting(false);
    props.onLogin(provider);
  };

  return (
    <>
      {isMetaMaskInstalled && (
        <button
          onClick={onLoginHandler}
          type="button"
        >
          {!isConnecting && "Connect"}
          {isConnecting && "Loading..."}
        </button>
      )}
      {!isMetaMaskInstalled && (
        <p>
          Install MetaMask
        </p>
      )}
    </>
  );
};

export default Login;
