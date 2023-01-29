import { useState } from "react";
import { getWeb3, getSpamReportContractInstance } from "lib/web3";
import { makeStorageClient } from "lib/web3Storage";
import FileIcon from "src/assets/images/upload.svg"

const ReportForm = () => {
  const [ip, setIp] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getFiles = () => {
    const fileInput = document.querySelector('input[type="file"]');
    console.log({ fileInput });
    return fileInput?.files;
  };

  const storeFiles = async (files) => {
    const client = await makeStorageClient();
    const cid = await client.put(files);
    console.log('stored files with cid:', cid);
    return cid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hash = await storeFiles(getFiles());
    setSubmitting(true);
    try {
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getSpamReportContractInstance();
      await contract.methods.reportSpam(ip, description, hash).send({ from: accounts[0] });
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error({ err });
      setSubmitting(false);
    }
  }

  return (

    <form className="formfield" onSubmit={handleSubmit}>
      <h3 className="formheading">Report an IP Address</h3>
      <label>
        <input type="text" value={ip} placeholder="IP Address" onChange={(e) => setIp(e.target.value)} disabled={submitting} required />
      </label>
      <br />
      <label>
        <textarea value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} disabled={submitting} required />
      </label>
      <br />
      <label className="filebutton">

        {/* <img src={FileIcon.src} alt="" /> */}
        <span>
          <input type="file" id="myFile" name="myFile" placeholder="Evidence" disabled={submitting} required />

        </span>
      </label>
      <br />
      <button className="button" type="submit" value="Report" disabled={submitting}>Report</button>
      {submitted && <p>Report submitted!</p>}
    </form>
  );
}

export default ReportForm;
