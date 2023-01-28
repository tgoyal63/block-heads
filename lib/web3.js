import Web3 from "web3";
import SpamReports from "./spamReports";
import NftAuction from "./nftAuction";
import MintNft from "./mintNft";

const rpcURL = "https://goerli.infura.io/v3/0887fc7a7c25419e8751696713eb9d68";

let web3;

export const getWeb3 = () => {
  if ((typeof window.ethereum !== "undefined") || (typeof window.web3 !== "undefined"))
    web3 = new Web3(window.ethereum || window.web3.currentProvider || rpcURL);
  return web3;
};

const getContractInstance = (abi, address) => new web3.eth.Contract(abi, address);

export const getSpamReportContractInstance = () => getContractInstance(SpamReports.abi, SpamReports.address);

export const getNftAuctionContractInstance = () => getContractInstance(NftAuction.abi, NftAuction.address);

export const getMintNftContractInstance = () => getContractInstance(MintNft.abi, MintNft.address);
