/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import AddressContext from '@/context/AddressContext'
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "Pjyj1p5qvYMQaEXdUFH3p7beiWlzpKhc",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

export default function Home() {
  const addrInfo = useContext(AddressContext);
  // const { nfts, loading, error } = useNfts(addrInfo);
  // console.log(nfts, loading, error)

  useEffect(() => {
    if (addrInfo) {
      getNfts(addrInfo)
    }
  }, [addrInfo]);

  const getNfts = async (address) => {
    const nfts = await alchemy.nft.getNftsForOwner(address);

    const numNfts = nfts["totalCount"];
    const nftList = nfts["ownedNfts"];

    console.log(`Total NFTs owned by ${address}: ${numNfts} \n`);

    let i = 1;

    for (let nft of nftList) {
      console.log(`${i}. ${nft.title}`);
      i++;
    } 
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}
