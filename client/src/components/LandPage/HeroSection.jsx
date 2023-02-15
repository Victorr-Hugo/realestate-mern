import React from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../resources/banner.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full relative">
      <div className="absolute w-full md:w-fit top-1/2 md:left-1/2 md:-translate-x-1/2">
        <div>
          <div className="text-white md:text-[32px] text-[22px] font-medium">
            Discover a place you will love to live
          </div>
        </div>
        <div className="flex-col flex h-full px-4 ">
          <div
            onClick={() => navigate("/properties")}
            className="cursor-pointer ease-in-out delay-150 hover:translate-y-1 w-full hover:scale-110 duration-300 flex-row relative flex rounded-[9px] bg-white lg:w-[960px] md:w-[660px] py-1"
          >
            <div className="w-full grid sm:grid-cols-3 md:grid-cols-4 m-auto">
              <div className="flex-row flex w-full px-5">
                <div className="my-auto px-4">
                  <div className="bg-[#65a30d]/20 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Isolation_Mode"
                      data-name="Isolation Mode"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="#65a30d"
                      className="m-auto h-full block"
                    >
                      <path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z"></path>
                    </svg>
                  </div>
                </div>
                <div className="sm:flex-col flex-row flex text-left">
                  <div className="font-medium my-auto">Search city</div>
                  <div className="text-[12px] text-neutral-700 px-3 sm:px-0 my-auto">
                    Location
                  </div>
                </div>
              </div>
              <div className="flex-row  sm:flex hidden w-full px-5">
                <div className="my-auto px-4">
                  <div className="bg-[#65a30d]/20 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Isolation_Mode"
                      data-name="Isolation Mode"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="#65a30d"
                      className="m-auto h-full block"
                    >
                      <path d="M12,0C5.383,0,0,5.383,0,12c.603,15.898,23.4,15.894,24,0,0-6.617-5.383-12-12-12Zm1,17v1c-.005,1.308-1.995,1.307-2,0v-1h-.268c-1.067,0-2.063-.574-2.598-1.499-.277-.479-.113-1.09,.364-1.366,.479-.279,1.091-.113,1.366,.364,.179,.31,.511,.501,.867,.501h2.268c.997,.065,1.443-1.55,.356-1.76l-3.041-.507c-3.502-.649-2.748-5.753,.685-5.733v-1c.006-1.308,1.995-1.307,2,0v1h.268c1.067,0,2.063,.575,2.598,1.5,.277,.478,.113,1.089-.364,1.366-.48,.277-1.091,.113-1.366-.365-.179-.309-.511-.5-.867-.5h-2.268c-.997-.065-1.442,1.55-.356,1.76l3.041,.507c3.502,.649,2.748,5.753-.685,5.733Z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-col flex text-left">
                  <div className="font-medium">Price</div>
                  <div className="text-[12px] text-neutral-700">
                    price range
                  </div>
                </div>
              </div>
              <div className="flex-row hidden sm:flex w-full px-5">
                <div className="my-auto px-4">
                  <div className="bg-[#65a30d]/20 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Isolation_Mode"
                      data-name="Isolation Mode"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="#65a30d"
                      className="m-auto h-full block"
                    >
                      <path d="m11 0h-8a3 3 0 0 0 -3 3v21h14v-21a3 3 0 0 0 -3-3zm-5 19h-3v-2h3zm0-4h-3v-2h3zm0-4h-3v-2h3zm0-4h-3v-2h3zm5 12h-3v-2h3zm0-4h-3v-2h3zm0-4h-3v-2h3zm0-4h-3v-2h3zm10-2h-5v19h8v-16a3 3 0 0 0 -3-3zm0 14h-2v-2h2zm0-4h-2v-2h2zm0-4h-2v-2h2z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-col flex text-left">
                  <div className="font-medium">Type of home</div>
                  <div className="text-[12px] text-neutral-700">Apartment</div>
                </div>
              </div>
              <div className="flex-row hidden md:flex md:w-full px-5">
                <div className="my-auto px-4">
                  <div className="bg-[#65a30d]/20 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Isolation_Mode"
                      data-name="Isolation Mode"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="#65a30d"
                      className="m-auto h-full block"
                    >
                      <path d="m14 24a1 1 0 0 1 -.6-.2l-4-3a1 1 0 0 1 -.4-.8v-5.62l-7.016-7.893a3.9 3.9 0 0 1 2.916-6.487h14.2a3.9 3.9 0 0 1 2.913 6.488l-7.013 7.892v8.62a1 1 0 0 1 -1 1z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-col flex text-left">
                  <div className="font-medium">Filters</div>
                  <div className="text-[12px] text-neutral-700">Apartment</div>
                </div>
              </div>
            </div>
            <div className="h-full px-2 p-1">
              <div className="bg-lime-600 rounded-[9px] p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Isolation_Mode"
                  data-name="Isolation Mode"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="white"
                  className="m-auto h-full block"
                >
                  <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        alt=""
        src={banner}
        className="md:h-[432px] h-[678px] w-full object-cover"
      />
    </div>
  );
};

export default HeroSection;
