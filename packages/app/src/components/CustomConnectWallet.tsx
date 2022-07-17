import styled from "styled-components";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Button = styled.button.attrs({
  className: `
    inline-flex
    items-center
    px-2
    py-2
    text-sm
    text-gray-200
    font-semibold
    rounded-md
    shadow-sm

    uppercase

    bg-gradient-to-r
    bg-gray-800

    hover:text-gray-100
  `,
})``;

export const CustomConnectWallet = () => (
  <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      mounted,
    }) => {
      return (
        <div {...(!mounted && { "aria-hidden": true })}>
          {(() => {
            if (!mounted || !account || !chain) {
              return <Button onClick={openConnectModal}>Connect wallet</Button>;
            }
            if (chain.unsupported) {
              return <Button onClick={openChainModal}>Wrong network</Button>;
            }
            return (
              <div className="flex space-x-4">
                <Button onClick={openChainModal}>
                  {chain.hasIcon && (
                    <div
                      className="w-5 h-5 rounded-full overflow-x-hidden items-center mr-2"
                      style={{
                        background: chain.iconBackground,
                      }}
                    >
                      {chain.iconUrl && (
                        <img
                          alt={chain.name ?? "Chain icon"}
                          src={chain.iconUrl}
                          className="w-5 h-5"
                        />
                      )}
                    </div>
                  )}
                  {chain.name}
                </Button>
                <Button onClick={openAccountModal}>
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ""}
                </Button>
              </div>
            );
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>
);
