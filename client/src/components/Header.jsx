import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBrokers } from "../context/brokerContext";

import logo from "../resources/logo.png";

const Header = () => {
  const { brokerId } = useBrokers();
  const [lenguageOptions, setLenguageOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="block w-full">
      <div className="m-0 w-full block relative">
        <div className="fixed z-[99999] flex top-0 right-0 bg-white shadow left-0 h-[66px] px-10 items-center min-w-full w-full my-0 mx-auto text-[#1b1b1b] flex-row box-border">
          <a href="/" className="h-20 w-32 flex items-center">
            <img alt="logo" src={logo} className="object-cover" />
          </a>
          <div className="w-full h-full relative">
            <div className="absolute hidden right-0 top-1/4 justify-center items-center flex-row md:flex font-medium text-[1rem]">
              <div
                onClick={() => navigate("/properties")}
                className="mx-4 cursor-pointer"
              >
                Search
              </div>
              <div
                onClick={() => navigate("/create")}
                className="mx-4 cursor-pointer"
              >
                Sell
              </div>
              <div
                onClick={() => navigate("/tools")}
                className="mx-4 cursor-pointer"
              >
                Tools
              </div>
              {brokerId ? null : (
                <div
                  onClick={() => navigate("/login")}
                  className="bg-[#1b1b1b] rounded-[3px] py-1 px-3 cursor-pointer mx-2 flex-row flex box-border"
                >
                  <div className="px-1 text-white">Sign in</div>
                  <div className="m-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      className="block m-auto"
                      fill="white"
                    >
                      <path d="M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z"></path>
                      <circle cx="12" cy="6" r="6"></circle>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
