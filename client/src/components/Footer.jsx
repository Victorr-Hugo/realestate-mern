import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../resources/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="bg-slate-100 w-full p-10 text-left">
        <div className="flex-row md:flex w-full">
          <div className="md:w-1/3 md:px-10">
            <div className="w-full h-full">
              <div className="text-[1.17rem] leading-[1.2] font-semibold">
                Discover REALESTATE
              </div>
              <div className="mb-4 mt-8">
                REALESTATE is powered by &nbsp;
                <a
                  href="https://www.linkedin.com/in/victor-hugo-303324141/"
                  className="underline text-lime-600"
                >
                  Linkedin
                </a>
                , offering a wide range of technology tools and solutions
                tailored to meet the needs of real estate brokers.
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/victor-hugo-303324141/"
                  className="underline text-lime-600"
                >
                  Discover REALESTATE
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 py-10 md:py-0 md:px-10">
            <div className="w-full h-full">
              <div className="text-[1.17rem] text-lime-600 leading-[1.2] font-semibold">
                Join our team
              </div>
              <div className="mb-4 mt-8">
                Are you looking for a stimulating work enviorment and interested
                in a career with us? We may have the perfect job for you.
              </div>
              <div>
                <div
                  onClick={() => navigate("/login")}
                  className="underline text-lime-600 cursor-pointer"
                >
                  See all available positions
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 py-10 md:py-0 md:px-10">
            <div className="w-full h-full">
              <div className="text-[1.17rem] leading-[1.2] font-semibold">
                Contact REALESTATE
              </div>
              <div className="mb-4 mt-8">
                Do you have any questions or comments for us? Simply fill in the
                form designed for this purpose.
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/victor-hugo-303324141/"
                  className="underline text-lime-600"
                >
                  Contact REALESTATE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-row flex bg-white p-4 px-20">
        <div>
          <a href="/" className="h-20 w-32 flex items-center">
            <img alt="logo" src={logo} className="object-cover" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
