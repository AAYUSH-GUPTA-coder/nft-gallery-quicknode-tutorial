import Head from "next/head";
import WalletNFTs from "./WalletNFTs";

export default function Home() {
  return (
    <>
      <Head>
        <title> Quicknode NFT Gallery </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WalletNFTs />
    </>
  );
}
