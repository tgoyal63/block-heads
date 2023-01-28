import nftAuction from "lib/nftAuction";
import { getNftAuctionContractInstance, getWeb3 } from "lib/web3";
import { useState } from "react";

const Approve = () => {

  const [tokenId, setTokenId] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getNftAuctionContractInstance();
      await contract.methods.approve(nftAuction.address, tokenId).send({ from: accounts[0] });
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error({ err });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Approve Auction</h3>
      <input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="NFT Token ID" min="0" disabled={submitting} />
      <br />
      <button type="submit" disabled={submitting}>Approve Transfer</button>
      {submitted && <p>Approved successfully!</p>}
    </form >
  );
};

export default Approve;