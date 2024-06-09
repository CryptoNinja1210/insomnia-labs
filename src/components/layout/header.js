'use client'

import {useState, useEffect, useCallback} from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Select, SelectItem, Avatar} from "@nextui-org/react";
import {networkOptions} from "@/const/index"
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";

export default function Header({
  addrInfo,
  setAddrInfo,
  setNetInfoState,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [provider, setProvider] = useState(null);

	useEffect(() => {
    console.log(provider)
  }, [provider]);

	const onNetworkChange = (e) => {
    console.log(networkOptions.filter((v) => v.chainId == e.target.value)[0])
    switchNetwork(networkOptions.filter((v) => v.chainId == e.target.value)[0]);
    setNetInfoState(networkOptions.filter((v) => v.chainId == e.target.value)[0]);
  };

	async function switchNetwork(netinfo) {
		console.log(window.ethereum.networkVersion)
		console.log(netinfo.chainId)
    if (window.ethereum.networkVersion !== netinfo.chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: netinfo.chainId }],
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: netinfo.name,
                chainId: netinfo.chainId,
                nativeCurrency: netinfo.nativeCurrency,
                rpcUrls: [netinfo.rpcUrls],
              },
            ],
          });
        }
      }
    }
  }

  const connetWallet = useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: false,
    });

    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    const connection = await web3Modal.connect();
  
    const pv = new ethers.BrowserProvider(connection);

    setProvider(pv);
    const signer = pv.getSigner();
    const {address} = await signer;
		console.log(address)
    setAddrInfo(address);
  }, [setProvider, setAddrInfo]);

	async function disconnectWallet() {
    console.log("Killing the wallet connection", provider);
    setAddrInfo("");
    setProvider(null);
  }

	return (
		<Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
				<NavbarItem>{addrInfo ?? ''}</NavbarItem>
        <NavbarItem className=" w-60">
					<Select
						items={networkOptions}
						placeholder="Select a chain"
						labelPlacement="outside"
						classNames={{
							base: "max-w-xs",
							trigger: "h-12",
						}}
						onChange={onNetworkChange}
						renderValue={(items) => {
							return items.map((item, i) => (
								<div key={i} className="flex items-center gap-2">
									<Avatar
										alt={item.data.name}
										className="flex-shrink-0"
										size="sm"
										src={item.data.icon}
									/>
									<div className="flex flex-col">
										<span>{item.data.name}</span>
										<span className="text-default-500 text-tiny">({item.data.rpcUrls})</span>
									</div>
								</div>
							));
						}}
					>
						{(chain) => (
							<SelectItem key={chain.chainId} value={chain}>
								<div className="flex gap-2 items-center">
									<Avatar alt={chain.chainId} className="flex-shrink-0" size="sm" src={chain.icon} />
									<div className="flex flex-col">
										<span className="text-small">{chain.name}</span>
										<span className="text-tiny text-default-400">{chain.rpcUrls}</span>
									</div>
								</div>
							</SelectItem>
						)}
					</Select>
        </NavbarItem>
        <NavbarItem>
					{!addrInfo ? 
						<Button onClick={connetWallet} as={Link} color="warning" href="#" variant="flat">
							Connect Wallet
						</Button>:
						<Button onClick={disconnectWallet} as={Link} color="warning" href="#" variant="flat">
							Disconnect Wallet
						</Button>
					}
        </NavbarItem>
      </NavbarContent>
			<NavbarMenu>
				<NavbarMenuItem>
					<Link></Link>
				</NavbarMenuItem>
			</NavbarMenu>
    </Navbar>
	);
}
  