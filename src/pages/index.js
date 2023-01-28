import Head from "next/head"
import ReportForm from "@/components/ReportForm"
import ConnectWallet from "@/components/ConnectWallet"
import CurrentIp from "@/components/CurrentIp"


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
        <ConnectWallet />
        <ReportForm />
        <CurrentIp />
      </main>
    </>
  )
}
