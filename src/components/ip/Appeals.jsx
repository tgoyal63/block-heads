import { useState } from "react";
import { getWeb3, getSpamReportContractInstance } from "lib/web3";

function Appeals() {
  const [ip, setIp] = useState("");
  const [appeals, setAppeals] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getSpamReportContractInstance();
      const appeals = await contract.methods.getAppeals(ip).send({ from: accounts[0] });
      setAppeals(appeals);
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
      {submitted && appeals && console.log(appeals) &&
        appeals.forEach(appeal => (
          <div key={appeal.timestamp}>
            <p>Reporter: {appeal.reporter}</p>
            <p>Description: {appeal.description}</p>
            <p>Evidence Hash: {appeal.evidenceHash}</p>
            <p>Timestamp: {appeal.timestamp}</p>
          </div>
        ))}
    </>
  );
};


export default Appeals;
