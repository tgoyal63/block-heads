import Head from "next/head";
import Navbar from "@/components/Navbar";
import Reports from "@/components/ip/Reports";
import Appeals from "@/components/ip/Appeals";

const Statistics = () => {
  return (
    <>
      <Head>
        <title>Stats - Block Heads</title>
        <meta name="description" content="Block Heads" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />

        <div className="Report_Appeal"  id="stat">
        <h2 className="banner" id="stat_head">Statistics</h2>

        <Reports />
        <Appeals />
        </div>
      </main>
    </>
  );
};
export default Statistics;
