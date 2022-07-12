/* This example requires Tailwind CSS v2.0+ */
import styled from "styled-components";

export const SampleMarketsBanner = () => {
  return (
    <section className="bg-black flex py-16 justify-items-center justify-center space-x-8">
      <div className="py-24 px-32 bg-red-100">
        <span className="font-semibold">sBTC / sUSD</span>
      </div>
      <div className="py-24 px-32 bg-blue-100">sETH / sUSD</div>
      <div className="py-24 px-32 bg-green-100">sSOL / sUSD</div>
    </section>
  );
};
