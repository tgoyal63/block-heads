import { getWeb3, getNftAuctionContractInstance } from "lib/web3";
import { useState } from "react";

const View = () => {

  const [listingId, setListingId] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [listingData, setListingData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getNftAuctionContractInstance();
      const listingResult = await contract.methods.getListing(listingId).send({ from: accounts[0] });
      setListingData(listingResult);
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error({ err });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>View Listing Info</h3>
      <input type="number" value={listingId} onChange={(e) => setListingId(e.target.value)} placeholder="Listing Id" min="0" disabled={submitting} />
      <br />
      <button type="submit" disabled={submitting}>View Listing</button>
      {submitted && listingData &&
        <>
          <p>NFT Contract: <span id="contract-address">{listingData[0]}</span></p>
          <p>NFT ID: <span id="nft-id">{listingData[1]}</span></p>
          <p>Current Bid: <span id="current-bid">{listingData[2]}</span></p>
          <p>Min Price: <span id="min-price-view">{listingData[3]}</span></p>
          <p>End Time: <span id="end-time-view">{new Date(listingData[4].toNumber() * 1000)}</span></p>
        </>
      }
    </form >
  );
};

export default View;