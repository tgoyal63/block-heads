import mintNft from "lib/mintNft";
import { getNftAuctionContractInstance, getWeb3 } from "lib/web3";
import { useState } from "react";

const List = () => {

  const [tokenId, setTokenId] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getNftAuctionContractInstance();
      await contract.methods.list(mintNft.address, tokenId, minPrice, duration).send({ from: accounts[0] });
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error({ err });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>List</h3>
      <input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="Token ID" min="0" disabled={submitting} />
      <br />
      <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Minimum price" min="0" disabled={submitting} />
      <br />
      <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (hours)" min="1" disabled={submitting} />
      <br />
      <button className="button" type="submit" disabled={submitting}>List NFT</button>
      {submitted && <p>Listed successfully!</p>}
    </form >
  );
};

export default List;