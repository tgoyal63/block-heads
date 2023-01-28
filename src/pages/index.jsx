import Head from "next/head";
import ConnectWallet from "@/components/ConnectWallet";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Block Heads" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* Navbar */}
        <ConnectWallet />
      </main>
    </>
  );
};
