import Approve from "@/components/auction/approve";
import Bid from "@/components/auction/bid";
import End from "@/components/auction/end";
import List from "@/components/auction/list";
import View from "@/components/auction/view";
import Withdraw from "@/components/auction/withdrawFunds";
import Navbar from "@/components/Navbar";
import Head from "next/head";

const NftAuction = () => {
  return (
    <>
      <Head>
        <title>NFT Auction - Block Heads</title>
        <meta name="description" content="Block Heads" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="container">

        <Approve />
        <Bid />
        <End />
        <List />
        <View />
        <Withdraw />
        </div>
      </main>
    </>
  );
};

export default NftAuction;
