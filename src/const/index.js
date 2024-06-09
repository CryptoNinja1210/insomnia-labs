
export const networkOptions = [
    {
      icon: 'icons/ether.svg',
      name: 'Ethereum',
      chainId: "0x1",
      nativeCurrency: {
        name: 'ether',
        decimals: 18,
        symbol: 'eth'
      },
      rpcUrls: 'https://mainnet.infura.io/v3/'
    },
    {
      icon: '/icons/bnb-smart.svg', name: 'BNB Smart Chain', chainId: "0x38",
      nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
      rpcUrls: 'https://bsc-dataseed.binance.org/'
    },
    {
      icon: '/icons/aptos.svg', name: 'Aptos', chainId: "0xa4b1",
      nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
      rpcUrls: 'https://arb1.arbitrum.io/rpc'
    },
  ]