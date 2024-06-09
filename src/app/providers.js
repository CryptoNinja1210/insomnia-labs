'use client'

import {NextUIProvider} from '@nextui-org/react'
import {useState, useEffect} from "react";
import Header from "@/components/layout/header"
import AddressContext from '@/context/AddressContext'

export function Providers({children}) {
  const [addrInfo, setAddrInfo] = useState('');
  const [netInfoState, setNetInfoState] = useState({
    icon: 'icons/ether.svg', 
    name: 'Ethereum Mainnet', 
    chainId: "0x1",
    nativeCurrency: { 
      name: 'ether', 
      decimals: 18, 
      symbol: 'eth' ,
    },
    rpcUrls: 'https://eth.drpc.org/'
  });

  useEffect(() => {
    console.log('provider', addrInfo)
  }, [addrInfo]);

  return (
    <NextUIProvider>
      <Header
        addrInfo={addrInfo}
        setAddrInfo={setAddrInfo}
        netInfoState={netInfoState}
        setNetInfoState={setNetInfoState}
      />
      <AddressContext.Provider value={addrInfo}>
        {children}
      </AddressContext.Provider>
    </NextUIProvider>
  )
}