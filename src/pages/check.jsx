import AppealForm from "@/components/ip/AppealForm";
import ReportForm from "@/components/ip/ReportForm";
import Navbar from "@/components/Navbar";
import Head from "next/head";

const Check = () => {
  return (
    <>
      <Head>
        <title>Report/Appeal - Block Heads</title>
        <meta name="description" content="Block Heads" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="Report_Appeal">

          <ReportForm />
          <AppealForm />
        </div>
      </main>
    </>
  );
};

export default Check;
