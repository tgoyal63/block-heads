import { useState } from "react";

const ConnectWallet = () => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) alert("Please install Metamask!");

    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className="cta-button connect-wallet-button">
        Connect Wallet
      </button>
    )
  }

  return (
    <div>
      <h1>BLOCK HEADS</h1>
      <div>
        {currentAccount ? "Connected to: " + currentAccount : connectWalletButton()}
      </div>
    </div>
  )

}

export default ConnectWallet;