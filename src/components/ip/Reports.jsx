import { useState } from "react";
import { getWeb3, getSpamReportContractInstance } from "lib/web3";

const Reports = () => {
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
      const reportsData = await contract.methods.getReports(ip).call();
      console.log(reportsData);
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
      <div className="formgrid">

        <form onSubmit={handleSubmit}>
          <label>

            <input type="text" placeholder="IP Address" value={ip} onChange={(e) => setIp(e.target.value)} disabled={submitting} />
          </label>
          {/* <br /> */}
          <button className="button" type="submit" disabled={submitting}>View Reports</button>
        </form>
        {/* <br /> */}
        {submitted && reports && `${reports.length} Reports for ${ip}`}
        {reports.length > 0 ?
          <table>
            <tr className="table_header">
              <td>Reporter</td>
              <td>Description</td>
              <td>Evidence</td>
              <td>Timestamp</td>
            </tr>
          </table>
          && reports.forEach(report => (
            <table>
              <tr key={report.timestamp}>
                <td>{report.reporter}</td>
                <td>{report.description}</td>
                <td>{report.evidenceHash}</td>
                <td>{report.timestamp}</td>
              </tr>
            </table>
          )) : ""}
      </div>
    </>
  );
}

export default Reports;
