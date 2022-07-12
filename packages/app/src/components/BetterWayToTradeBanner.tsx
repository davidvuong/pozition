import "../css/backgrounds.css";

export const BetterWayToTradeBanner = () => {
  return (
    <div className="bg-black bg-graph-paper py-16 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl uppercase font-extrabold text-gray-300 sm:text-4xl">
            It's just a <span className="text-gray-400">better</span> way to
            trade.
          </h2>
          <p className="mt-3 uppercase font-semibold text-gray-300 sm:mt-4">
            Multi-positions across multi-wallets is just{" "}
            <span className="text-red-500">bad experience</span>. Focus on the
            money. Use <span className="font-misto">pozition</span>.
          </p>
        </div>
      </div>
      <div className="relative mt-16 pb-12 bg-black sm:pb-16 bg-graph-paper">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-black bg-graph-paper" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-gray-100 shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 uppercase leading-6 font-semibold text-gray-500">
                    Powered by Synthetix
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-gray-700">
                    100%
                  </dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 uppercase leading-6 font-semibold text-gray-500">
                    Uptime
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r via-red-800 from-gray-700 to-gray-700">
                    24/7
                  </dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 uppercase leading-6 font-semibold text-gray-500">
                    RUGS
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-gray-700">
                    ZERO
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
