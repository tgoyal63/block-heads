import { useState } from "react";
import { getWeb3, getSpamReportContractInstance } from "lib/web3";

const Appeals = () => {
  const [ip, setIp] = useState("");
  const [appeals, setAppeals] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAppeal = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getSpamReportContractInstance();
      const appeals = await contract.methods.getAppeals(ip).call();
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
      <div className="formgrid">
        <form onSubmit={handleAppeal}>
          <label>
            <input type="text" placeholder="IP Address" value={ip} onChange={(e) => setIp(e.target.value)} disabled={submitting} />
          </label>
          {/* <br /> */}
          <button className="button" type="submit" disabled={submitting}>View Appeals</button>
        </form>
        {/* <br /> */}
        {submitted && appeals && `${appeals.length} Appeals for ${ip}`}
        {appeals.length > 0 ?
          <table>
            <tr className="table_header">
              <td>Reporter</td>
              <td>Description</td>
              <td>Timestamp</td>
            </tr>
          </table>
          && appeals.forEach(appeal => (
            <table>
              <tr key={appeal.timestamp}>
                <td>{appeal.reporter}</td>
                <td>{appeal.description}</td>
                <td>{appeal.timestamp}</td>
              </tr>
            </table>
          )):""}
      </div>
    </>
  );
};


export default Appeals;
