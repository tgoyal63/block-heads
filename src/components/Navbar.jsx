import Logo from "@/assets/images/Untitled-1.png";
import BurgerMenu from "@/assets/images/hd_black_menu_burger_icon_transparent_background_31634946207uno2yrzogi.png";
import Link from "next/link";
import ConnectWallet from "@/components/ConnectWallet";
import { useState, useEffect } from "react";
import { getIp } from "lib/currentIp";
import { getWeb3, getSpamReportContractInstance } from "lib/web3";

const Navbar = () => {
  const [ipScore, setIpScore] = useState({ score: 0, blocked: false });
  const [ip, setIp] = useState("");

  const getData = async () => {
    setIp(await getIp());
  };

  const scoreUpdate = async () => {
    try {
      await getData();
      const accounts = await getWeb3().eth.getAccounts();
      const contract = await getSpamReportContractInstance();
      const ipScoreData = await contract.methods.getIpScore(ip).call();
      console.log(ipScoreData);
      setIpScore(ipScoreData);
    } catch (err) {
      console.error({ err });
    }
  };

  useEffect(() => {
    scoreUpdate()
  }, []);

  return (
    <header className="site-header">
      <div className="wrapper site-header__wrapper">
        <div className="site-header__start">
          <Link href="/" className="brand">
            <img src={Logo.src} alt="" />
          </Link>
        </div>
        <div className="ip_score">
          <h6 id="ip">
            <a href="#">Current IP</a>
          </h6>{" "}
          <h6> {ip}</h6>
          <h6 id="score">
            <a href="#">IP Score</a>{" "}
          </h6>{" "}
          <h6>{ipScore.score}</h6>
        </div>
        <div className="site-header__middle">
          <nav className="nav">
            <a className="nav__toggle" aria-expanded="false" type="button">
              <img className="burger" src={BurgerMenu.src} alt="" />
            </a>
            <ul className="nav__wrapper">
              <li className="nav__item">
                <Link href="/">Home</Link>
                <div className="underline"></div>
              </li>
              <li className="nav__item">
                <Link href="/statistics">Statistics</Link>
                <div className="underline"></div>
              </li>
              {/* <li className="nav__item">
                <Link href="/nft-auction">NFT Auction</Link>
                <div className="underline"></div>
              </li> */}
              <li className="nav__item">
                <Link href="/check">Report/Appeal</Link>
                <div className="underline"></div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="site-header__end">
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
