import Head from "next/head";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Block Heads</title>
        <meta name="description" content="Block Heads" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <h1 className="banner">D-Spam</h1>
        <p>A decentralized web application to protect you against spam IP Addresses.</p>
      </main>
    </>
  );
}
