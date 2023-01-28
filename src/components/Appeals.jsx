import { useEffect, useState } from "react";
import { getWeb3, getSpamReportContractInstance } from "../../lib/web3";

function Appeals({ ip }) {
  const [appeals, setAppeals] = useState([]);

  useEffect(() => {
    async function getAppeals() {
      const accounts = getWeb3().eth.getAccounts();
      const appeals = await getSpamReportContractInstance().methods.getAppeals(ip).call({ from: accounts[0] });
      setAppeals(appeals);
    }
    getAppeals();
  }, [library, account, ip]);

  return (
    <div>
      <h3>Appeals for IP: {ip}</h3>
      {appeals.map((report, index) => (
        <div key={index}>
          <p>Reporter: {report.reporter}</p>
          <p>Description: {report.description}</p>
          <p>Timestamp: {report.timestamp}</p>
        </div>
      ))}
    </div>
  );
}

export default Appeals;
