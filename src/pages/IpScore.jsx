import { useState } from "react";
import { getWeb3, getSpamReportContractInstance } from "../../lib/web3";

function IpScore() {
  const [ipScore, setIpScore] = useState({ score: 0, blocked: false });
  const [ip, setIp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getSpamReportContractInstance();
      const ipScoreData = await contract.methods.getIpScore(ip).send({ from: accounts[0] });
      setIpScore(ipScoreData);
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error({ err });
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          IP:
          <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} disabled={submitting} />
        </label>
        <br />
        <button type="submit" disabled={submitting}>Submit</button>
      </form>
      <br />
      {submitted && ipScore.score > 0 && (
        <div>
          <p>Score: {ipScore.score}</p>
          <p>Blocked: {ipScore.blocked ? "Yes" : "No"}</p>
        </div>
      )}
    </>
  );
}

export default IpScore;
