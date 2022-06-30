export interface OptimismNetwork {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  iconUrls: string[];
  fraudProofWindow?: number;
}

export const OPTIMISM_NETWORKS: Record<number, OptimismNetwork> = {
  10: {
    chainId: '0xA',
    chainName: 'Optimism Mainnet',
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
    iconUrls: ['https://optimism.io/images/metamask_icon.svg', 'https://optimism.io/images/metamask_icon.png'],
  },
  69: {
    chainId: '0x45',
    chainName: 'Optimism Kovan',
    rpcUrls: ['https://kovan.optimism.io'],
    blockExplorerUrls: ['https://kovan-optimistic.etherscan.io'],
    iconUrls: ['https://optimism.io/images/metamask_icon.svg', 'https://optimism.io/images/metamask_icon.png'],
  },
};
