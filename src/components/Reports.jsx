import { useEffect, useState } from "react";
import { getWeb3, getSpamReportContractInstance } from "../../lib/web3";

function Reports({ ip }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function getReports() {
      const accounts = getWeb3().eth.getAccounts();
      const reports = await getSpamReportContractInstance().methods.getReports(ip).call({ from: accounts[0] });
      setReports(reports);
    }
    getReports();
  }, [library, account, ip]);

  return (
    <div>
      <h3>Reports for IP: {ip}</h3>
      {reports.map((report, index) => (
        <div key={index}>
          <p>Reporter: {report.reporter}</p>
          <p>Description: {report.description}</p>
          <p>Evidence Hash: {report.evidenceHash}</p>
          <p>Timestamp: {report.timestamp}</p>
        </div>
      ))}
    </div>
  );
}

export default Reports;
