import styled from "styled-components";

const PageTitle = styled.h1.attrs({
  className: `
    text-3xl
    text-gray-300
    font-extrabold
    uppercase
    sm:text-4xl
  `,
})``;

const PageSubtitle = styled.p.attrs({
  className: `
    mt-3
    uppercase
    font-semibold
    text-gray-300
    sm:mt-4
  `,
})``;

const BetterDescription = styled.dt.attrs({
  className: `
    order-2
    mt-2
    uppercase
    leading-6
    font-semibold

    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-red-800
    to-gray-500
  `,
})``;

const BetterTitle = styled.dd.attrs({
  className: `
    order-1
    text-5xl
    font-extrabold
    text-gray-400

    hover:text-gray-300
  `,
})``;

export const BannerBetterWayToTrade = () => {
  return (
    <div className="bg-black-800 bg-graph-paper py-16 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <PageTitle>
            It's just a <span className="text-gray-400">better</span> way to
            trade.
          </PageTitle>
          <PageSubtitle>
            Multi-positions across multi-wallets is just{" "}
            <span className="text-red-500">bad experience</span>. Focus on the
            money. Use <span className="font-misto">ponzition</span>.
          </PageSubtitle>
        </div>
      </div>
      <div className="relative mt-16 pb-12 bg-black-800 sm:pb-16 bg-graph-paper">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-black-800 bg-graph-paper" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col p-6 text-center">
                  <BetterDescription>Powered by Synthetix</BetterDescription>
                  <BetterTitle>100%</BetterTitle>
                </div>
                <div className="flex flex-col p-6 text-center">
                  <BetterDescription>Uptime</BetterDescription>
                  <BetterTitle>24/7</BetterTitle>
                </div>
                <div className="flex flex-col p-6 text-center">
                  <BetterDescription>Rugs</BetterDescription>
                  <BetterTitle>ZERO</BetterTitle>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
