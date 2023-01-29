import { getNftAuctionContractInstance, getWeb3 } from "lib/web3";
import { useState } from "react";

const End = () => {
  const [listingId, setListingId] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getNftAuctionContractInstance();
      await contract.methods.end(listingId).send({ from: accounts[0] });
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error({ err });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>End Listing</h3>
      <input type="number" value={listingId} onChange={(e) => setListingId(e.target.value)} placeholder="Listing ID" min="0" disabled={submitting} />
      <br />
      <button className="button" type="submit" disabled={submitting}>End Auction</button>
      {submitted && <p>Listing ended!</p>}
    </form >
  );
};

export default End;