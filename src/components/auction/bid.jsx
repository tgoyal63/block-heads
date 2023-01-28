import { getNftAuctionContractInstance, getWeb3 } from "lib/web3";
import { useState } from "react";

const Bid = () => {

  const [listingId, setListingId] = useState(0);
  const [bidAmount, setBidAmount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getNftAuctionContractInstance();
      await contract.methods.bid(listingId, {value: bidAmount}).send({ from: accounts[0] });
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error({ err });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Bid on Listing</h3>
      <input type="number" value={listingId} onChange={(e) => setListingId(e.target.value)} placeholder="Listing ID" min="0" disabled={submitting} />
      <br />
      <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder="Bid Amount" min="1" disabled={submitting} />
      <br />
      <button type="submit" disabled={submitting}>Bid</button>
      {submitted && <p>Bid successfully!</p>}
    </form >
  );
};

export default Bid;