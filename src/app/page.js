'use client'

import Image from "next/image";
import {useContext, useEffect} from "react";
import AddressContext from '@/context/AddressContext'

export default function Home() {
  const addrInfo = useContext(AddressContext);
    console.log('props', addrInfo)
  useEffect(() => {
    console.log('props', addrInfo)
  }, [addrInfo]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
    </main>
  );
}
