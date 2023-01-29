import { useState } from "react";
import { getWeb3, getSpamReportContractInstance } from "lib/web3";

const AppealForm = () => {
  const [ip, setIp] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getSpamReportContractInstance();
      await contract.methods.appeal(ip, description).send({ from: accounts[0] });
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error({ err });
      setSubmitting(false);
    }
  }

  return (
    <form  className="formfield" onSubmit={handleSubmit}>
      <h3 className="formheading">Appeal</h3>
      <label>
        
        <input type="text" value={ip} placeholder="IP Address" onChange={(e) => setIp(e.target.value)} disabled={submitting} />
      </label>
      <br />
      <label>
        
        <textarea value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} disabled={submitting} />
      </label>
      <br />
      <button className="button" type="submit" disabled={submitting}>Submit</button>
      {submitted && <p>Appeal submitted!</p>}
    </form>
  );
};

export default AppealForm;
