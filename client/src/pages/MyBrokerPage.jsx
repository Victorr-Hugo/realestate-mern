import React, { useEffect, useState } from "react";
import banner from "../resources/brokerpage_banner.jpg";

export const MyBrokerPage = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full">
        <img alt="" src={banner} className="h-[345px] w-full object-cover" />
        <h1 className="py-3 text-left text-[2.4rem] font text-[#333] px-10">
          MY REAL ESTATE BROKER
        </h1>
      </div>
    </div>
  );
};
