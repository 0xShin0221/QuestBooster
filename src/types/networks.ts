export interface NetworkConfigInterface {
  chainId: number;
  symbol: string;
  blockExplorer: {
    name: string;
    generateContractUrl: (contractAddress: string) => string;
  };
}
/*
 * Ethereum
 */
export const ethereumTestnet: NetworkConfigInterface = {
  chainId: 5,
  symbol: `ETH (test)`,
  blockExplorer: {
    name: `Etherscan (goerli)`,
    generateContractUrl: (contractAddress: string) =>
      `https://goerli.etherscan.io/address/${contractAddress}`,
  },
};

export const ethereumMainnet: NetworkConfigInterface = {
  chainId: 1,
  symbol: `ETH`,
  blockExplorer: {
    name: `Etherscan`,
    generateContractUrl: (contractAddress: string) =>
      `https://etherscan.io/address/${contractAddress}`,
  },
};

/*
 * Polygon
 */
export const polygonTestnet: NetworkConfigInterface = {
  chainId: 80001,
  symbol: `MATIC (test)`,
  blockExplorer: {
    name: `Polygonscan (Mumbai)`,
    generateContractUrl: (contractAddress: string) =>
      `https://mumbai.polygonscan.com/address/${contractAddress}`,
  },
};

export const polygonMainnet: NetworkConfigInterface = {
  chainId: 137,
  symbol: `MATIC`,
  blockExplorer: {
    name: `Polygonscan`,
    generateContractUrl: (contractAddress: string) =>
      `https://polygonscan.com/address/${contractAddress}`,
  },
};
