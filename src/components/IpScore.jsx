import React, { useState, useEffect } from "react";
import { getWeb3, getSpamReportContractInstance } from "../../lib/web3";

function IpScore(props) {
  const { account } = useWeb3Context();
  const [ipScore, setIpScore] = useState({ score: 0, blocked: false });
  const [ip, setIp] = useState("");

  useEffect(() => {
    async function getIpScore() {
      const accounts = await getWeb3().eth.getAccounts();
      const scoreData = await getSpamReportContractInstance().methods.getIpScore(ip).call({ from: accounts[0] });
      setIpScore({ score: scoreData[0], blocked: scoreData[1] });
    }
    if (ip) {
      getIpScore();
    }
  }, [ip, account]);

  return (
    <div>
      <input type="text" value={ip} onChange={e => setIp(e.target.value)} placeholder="Enter IP address" />
      {ipScore.score > 0 && (
        <div>
          <p>Score: {ipScore.score}</p>
          <p>Blocked: {ipScore.blocked ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}

export default IpScore;
