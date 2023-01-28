import { useState } from "react";
import { getWeb3, getSpamReportContractInstance } from "lib/web3";

function Reports() {
  const [ip, setIp] = useState("");
  const [reports, setReports] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getSpamReportContractInstance();
      const reportsData = await contract.methods.getReports(ip).send({ from: accounts[0] });
      setReports(reportsData);
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
      {submitted && reports &&
        <h3>Reports for IP: {ip}</h3>
        && reports.forEach((report) => (
          <div key={report.timestamp}>
            <p>Reporter: {report.reporter}</p>
            <p>Description: {report.description}</p>
            <p>Evidence Hash: {report.evidenceHash}</p>
            <p>Timestamp: {report.timestamp}</p>
          </div>
        ))}
    </>
  );
}

export default Reports;
