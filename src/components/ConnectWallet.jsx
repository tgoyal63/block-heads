import { useState } from "react";

const ConnectWallet = () => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) alert("Please install Metamask!");

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className="button">
        {currentAccount ? "Connected to: " + currentAccount : "Connect Wallet"}
      </button>
    );
  };

  return connectWalletButton();
};

export default ConnectWallet;
