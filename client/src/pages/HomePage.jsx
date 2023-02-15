import React from "react";
import HeroSection from "../components/LandPage/HeroSection";
import FeedSection from "../components/LandPage/FeedSection";
import BlogSection from "../components/LandPage/BlogSection";
import Footer from "../components/Footer";

export const HomePage = () => {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <div className="w-full ">
        <div className="w-full">
          <div className="sm:flex-row flex-col md:px-20 px-10 flex w-full pt-20">
            <div className="flex-col flex w-full sm:w-2/5 md:w-2/3 text-left break-words">
              <div className="text-lime-600 pb-3 font-medium ">
                WHY CHOOSE REALESTATE
              </div>
              <div className="text-[1.8rem] font-bold">
                Provides the most complete list of property
              </div>
            </div>
            <div className="md:w-1/3 sm:w-3/5 my-auto text-justify text-neutral-700 sm:px-6">
              Find the ideal property that is most suitable for you. Starting
              from houses for sale that are minimalist, apartments for sale that
              are exclusive.
            </div>
          </div>
          <div className="py-[68px] w-full md:px-20">
            <div className="w-full sm:grid-cols-3 grid gap-10">
              <div className="hover:shadow-md rounded-[9px] text-left md:text-justify px-10 py-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Isolation_Mode"
                  data-name="Isolation Mode"
                  viewBox="0 0 24 24"
                  width="54"
                  height="54"
                  fill="#65a30d"
                  className="block m-auto"
                >
                  <path d="M19,15h-1c-.553,0-1-.447-1-1s.447-1,1-1h1c.553,0,1,.447,1,1s-.447,1-1,1Zm1,3c0-.553-.447-1-1-1h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1Zm-4-12c0-.553-.447-1-1-1h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1Zm4,0c0-.553-.447-1-1-1h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1Zm0,4c0-.553-.447-1-1-1h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1Zm4,9V5c0-2.757-2.243-5-5-5h-5c-2.757,0-5,2.243-5,5,0,.553,.447,1,1,1s1-.447,1-1c0-1.654,1.346-3,3-3h5c1.654,0,3,1.346,3,3v14c0,1.654-1.346,3-3,3h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c2.757,0,5-2.243,5-5Zm-8,.5v-4.152c0-1.548-.699-2.982-1.919-3.938l-3-2.349c-1.814-1.418-4.348-1.419-6.162,0l-3,2.348c-1.22,.955-1.919,2.39-1.919,3.938v4.152c0,2.481,2.019,4.5,4.5,4.5h7c2.481,0,4.5-2.019,4.5-4.5Zm-6.151-8.863l3,2.348c.731,.573,1.151,1.435,1.151,2.363v4.152c0,1.379-1.121,2.5-2.5,2.5H4.5c-1.379,0-2.5-1.121-2.5-2.5v-4.152c0-.929,.42-1.79,1.151-2.363l3-2.347c.544-.426,1.196-.639,1.849-.639s1.305,.213,1.849,.638Zm.151,7.363v-2c0-.552-.448-1-1-1h-2c-.552,0-1,.448-1,1v2c0,.552,.448,1,1,1h2c.552,0,1-.448,1-1Z"></path>
                </svg>
                <div className="font-bold text-[1.1rem] text-center py-3">
                  Find your dream house
                </div>
                <div className="text-neutral-800 text-[15px]">
                  Many ads for apartments and houses for sale in various
                  locations. Tap your finger on the screen then open the door of
                  your dream house from here.
                </div>
              </div>
              <div className="hover:shadow-md rounded-[9px] text-left md:text-justify px-10 py-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Isolation_Mode"
                  data-name="Isolation Mode"
                  viewBox="0 0 24 24"
                  width="54"
                  height="54"
                  fill="#65a30d"
                  className="block m-auto"
                >
                  <path d="m7 14a1 1 0 0 1 -1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zm4-1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zm-5 4h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zm5 0h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zm-5-12h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zm5 0h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zm-5 4h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zm5 0h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2zm13 1v9a5.006 5.006 0 0 1 -5 5h-14a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h6a5.006 5.006 0 0 1 5 5h3a5.006 5.006 0 0 1 5 5zm-19 12h9v-17a3 3 0 0 0 -3-3h-6a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3zm17-12a3 3 0 0 0 -3-3h-3v15h3a3 3 0 0 0 3-3zm-3 3a1 1 0 1 0 1 1 1 1 0 0 0 -1-1zm0 4a1 1 0 1 0 1 1 1 1 0 0 0 -1-1zm0-8a1 1 0 1 0 1 1 1 1 0 0 0 -1-1z"></path>
                </svg>
                <div className="font-bold text-[1.1rem] text-center py-3">
                  Find place of business
                </div>
                <div className="text-neutral-800 text-[15px]">
                  Renting a place of business and buying and selling shop houses
                  becomes easier. Meet your business and investment needs
                  faster.
                </div>
              </div>
              <div className="hover:shadow-md rounded-[9px] text-left md:text-justify px-10 py-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Isolation_Mode"
                  data-name="Isolation Mode"
                  viewBox="0 0 24 24"
                  width="54"
                  height="54"
                  fill="#65a30d"
                  className="block m-auto"
                >
                  <path d="M22,5.724V2c0-.552-.447-1-1-1s-1,.448-1,1v2.366L14.797,.855c-1.699-1.146-3.895-1.146-5.594,0L2.203,5.579c-1.379,.931-2.203,2.48-2.203,4.145v9.276c0,2.757,2.243,5,5,5h3.913c.822,0,1.572-.516,1.867-1.283l1.29-3.358c.118-.307,.077-.653-.109-.925s-.495-.434-.824-.434h-2.756c-.19,0-.284-.121-.323-.192-.039-.072-.089-.217,.007-.364l4.957-7.369c.062-.094,.204-.097,.271-.009,.032,.044,.041,.093,.024,.146l-1.369,4.497c-.092,.303-.035,.632,.153,.887,.188,.255,.487,.405,.804,.405h2.869c.097,0,.154,.052,.186,.096,.03,.043,.061,.114,.029,.206l-1.74,5.045c-.211,.61-.113,1.288,.262,1.814,.374,.525,.983,.839,1.629,.839h2.861c2.757,0,5-2.243,5-5V9.724c0-1.581-.743-3.058-2-4Zm0,13.276c0,1.654-1.346,3-3,3h-2.861l1.74-5.045c.234-.68,.126-1.435-.291-2.02-.418-.585-1.096-.935-1.814-.935h-1.52l.977-3.206c.201-.663,.08-1.362-.332-1.918-.412-.557-1.047-.876-1.739-.876-.729,0-1.405,.364-1.803,.967l-4.96,7.374c-.475,.729-.511,1.656-.097,2.42,.415,.764,1.212,1.239,2.081,1.239h1.301l-.769,2h-3.913c-1.654,0-3-1.346-3-3V9.724c0-.999,.494-1.929,1.322-2.487L10.322,2.513c1.02-.688,2.336-.688,3.355,0l7,4.724c.828,.558,1.322,1.488,1.322,2.487v9.276Z"></path>
                </svg>
                <div className="font-bold text-[1.1rem] text-center py-3">
                  Smart feature rich
                </div>
                <div className="text-neutral-800 text-[15px]">
                  There are 900 thousand property ads. Everything you can
                  explore and plan using smart features like the Mortgage
                  Calculator.
                </div>
              </div>
            </div>
          </div>
          <FeedSection />
          <BlogSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};
