import { getNftAuctionContractInstance, getWeb3 } from "lib/web3";
import { useState } from "react";

const Withdraw = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getNftAuctionContractInstance();
      await contract.methods.withdrawFunds().send({ from: accounts[0] });
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error({ err });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className="button" type="submit" disabled={submitting}>Withdraw Funds</button>
      {submitted && <p>Funds withdrawn successfully!</p>}
    </form >
  );
};

export default Withdraw;