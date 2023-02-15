import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useListings } from "../context/listingContext";

import ListingLocation from "../components/Map/ListingLocation";
import Footer from "../components/Footer";

export const ListingPage = () => {
  const { getListing } = useListings();
  const [listing, setListing] = useState({});
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const res = await getListing(params.id);
        setListing(res);
      }
    })();
  }, [params.id, getListing]);

  return (
    <div className="w-full md:px-10 pt-10">
      <div className="shadow-md drop-shadow-xl w-full text-left">
        <div className="flex-row flex md:p-3 w-full">
          <div className="flex-col md:flex w-1/2">
            <div className="text-[18px] font-extrabold">House for Sale</div>
            <div className="text-[15px]">{listing?.name}</div>
          </div>
          <div className="w-1/2 ">
            <div className="w-full flex-row md:flex h-full">
              <div className="w-1/3 px-4 border-r text-[22px] font-extrabold">
                ${new Intl.NumberFormat().format(listing?.price)}
              </div>

              <div className="bg-lime-700/40 w-full h-full justify-center items-center transition-all ease-in-out dealay-150 hover:bg-lime-700/70 duration-300 cursor-pointer">
                <div className="w-full h-full">
                  <div className="text-white text-center h-full w-full text-[18px] font-semibold">
                    <p className="my-auto h-full">
                      Contact the real estate broker
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex-row md:flex">
          <div className="md:w-1/2 mr-[2px]">
            <img
              alt=""
              src={listing?.displayImages?.[0].url}
              className="w-full h-full"
            />
          </div>
          <div className="md:w-1/2 ml-[2px]">
            <div className="w-full grid grid-cols-2 gap-1">
              <img
                alt=""
                src={listing?.displayImages?.[1].url}
                className="cursor-pointer min-h-full h-full w-full min-w-full"
              />
              <img
                alt=""
                src={listing?.displayImages?.[2].url}
                className="cursor-pointer min-h-full h-full w-full min-w-full"
              />
              <img
                alt=""
                src={listing?.displayImages?.[3].url}
                className=" cursor-pointer min-h-full h-full w-full min-w-full"
              />
              <img
                alt=""
                src={listing?.displayImages?.[4].url}
                className="cursor-pointer min-h-full h-full w-full min-w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-4">
        <div className="w-full flex-row flex">
          <a
            href={`https://www.google.com/maps?z=12&t=m&q=loc:${listing.latitude}+${listing.longitude}`}
            className="flex-row mx-1 flex border rounded-[5px] w-[321px] py-2 px-4 transition-all ease-in-out dealay-150 hover:border-lime-800 duration-300 cursor-pointer"
          >
            <div className="text-lime-700 text-[16px] font-medium">Map</div>
            <div className="ml-auto mr-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Outline"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="#65a30d"
              >
                <path d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"></path>
                <path d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z"></path>
              </svg>
            </div>
          </a>
          <a
            href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${listing.latitude},${listing.longitude}&heading=-45&pitch=38&fov=80`}
            className="flex-row mx-1 flex border rounded-[5px] w-[321px] py-2 px-4 transition-all ease-in-out dealay-150 hover:border-lime-800 duration-300 cursor-pointer"
          >
            <div className="text-lime-700 text-[16px] font-medium">
              Street view
            </div>
            <div className="ml-auto mr-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Outline"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="#65a30d"
              >
                <path d="M12,0c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5-2.5-1.119-2.5-2.5,1.119-2.5,2.5-2.5Zm3,19v-4.171c1.164-.413,2-1.525,2-2.829v-2c0-2.206-1.794-4-4-4h-2c-2.206,0-4,1.794-4,4v2c0,1.304,.836,2.416,2,2.829v4.171c0,.552,.447,1,1,1s1-.448,1-1v-5c0-.552-.447-1-1-1s-1-.449-1-1v-2c0-1.103,.897-2,2-2h2c1.103,0,2,.897,2,2v2c0,.551-.448,1-1,1s-1,.448-1,1v5c0,.552,.447,1,1,1s1-.448,1-1Zm9,.5c0-1.748-2.059-3.138-5.797-3.913-.539-.113-1.07,.235-1.183,.776-.112,.541,.235,1.07,.776,1.182,3.145,.653,4.203,1.616,4.203,1.955,0,.748-3.402,2.5-10,2.5s-10-1.752-10-2.5c0-.339,1.059-1.302,4.203-1.955,.541-.112,.889-.642,.776-1.182-.113-.541-.646-.889-1.183-.776-3.738,.775-5.797,2.165-5.797,3.913,0,3.092,6.221,4.5,12,4.5s12-1.408,12-4.5Z"></path>
              </svg>
            </div>
          </a>
        </div>
        <div className="w-full py-4 text-left">
          <div className="text-[1.25rem] leading-[1.2] font-medium">
            Features
          </div>
          <div className="flex-row md:flex w-full py-4">
            <div className="flex-row mr-2 flex w-1/4 rounded-[6px] p-1">
              <div className="border rounded-full p-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M18.5,0A2.5,2.5,0,1,0,21,2.5,2.5,2.5,0,0,0,18.5,0ZM8.707,18.474,5.685,21.5l.2.2a.99.99,0,0,0,.7.3.944.944,0,0,0,.71-.286,1,1,0,0,1,1.4,1.429A2.982,2.982,0,0,1,6.6,24H6.57a2.981,2.981,0,0,1-2.112-.9l-2.8-2.856a1,1,0,1,1,1.428-1.4l1.2,1.224L7.293,17.06a1,1,0,0,1,1.414,1.414ZM18,20a1,1,0,0,0-1,1,1,1,0,0,1-1,1V18.845a1,1,0,0,0-.312-.725l-3.4-3.229,4.83-4.829h0a3,3,0,0,0-.1-4.338l-.67-.56A5.011,5.011,0,0,0,13.145,4H5A1,1,0,0,0,5,6h7.781L9,9.783a3.35,3.35,0,0,0,.062,4.8L14,19.274V22H12a1,1,0,0,0,0,2h4a3,3,0,0,0,3-3A1,1,0,0,0,18,20Z"></path>
                </svg>
              </div>
              <div className="my-auto mx-4 text-[20px] font-normal">
                Lifestyle
              </div>
            </div>
            <div className="flex-row mr-2 flex md:w-1/4 rounded-[6px] p-1">
              <div className="rounded-full p-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M13.768,1.147a2.5,2.5,0,0,0-3.536,0L0,11.38V21a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.38ZM21,21H16V17.818A3.818,3.818,0,0,0,12.182,14h-.364A3.818,3.818,0,0,0,8,17.818V21H3V12.622l9-9,9,9Z"></path>
                </svg>
              </div>
              <div className="my-auto mx-4 text-[20px] font-normal">
                {listing.bedrooms + listing.bathrooms} Rooms
              </div>
            </div>
            <div className="flex-row mr-2 flex md:w-1/4  rounded-[6px] p-1">
              <div className="rounded-full p-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M19,6H13A4.987,4.987,0,0,0,8.584,8.705,3.464,3.464,0,0,0,6.5,8,3.5,3.5,0,0,0,3,11.5,3.464,3.464,0,0,0,3.351,13H2V3A1,1,0,0,0,0,3V21a1,1,0,0,0,2,0V19H22v2a1,1,0,0,0,2,0V11A5.006,5.006,0,0,0,19,6Zm-9,5a3,3,0,0,1,3-3h6a3,3,0,0,1,3,3v2H10Zm-5,.5A1.5,1.5,0,1,1,6.5,13,1.5,1.5,0,0,1,5,11.5ZM2,17V15H22v2Z"></path>
                </svg>
              </div>
              <div className="my-auto mx-4 text-[20px] font-normal">
                {listing.bedrooms} Beedrooms
              </div>
            </div>
            <div className="flex-row mr-2 flex md:w-1/4  rounded-[6px] p-1">
              <div className="rounded-full p-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M21,12H12.021l-2.054-2.935c-.905-1.293-2.388-2.065-3.966-2.065h-.5c-1.93,0-3.5,1.57-3.5,3.5v1.684c-1.161,.414-2,1.514-2,2.816v4c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5v-4c0-1.654-1.346-3-3-3Zm-12,2v8h-2V14h2Zm2,0h2v8h-2V14Zm4,0h2v8h-2V14ZM5.5,9h.5c.926,0,1.796,.453,2.328,1.212l1.252,1.788H4v-1.5c0-.827,.673-1.5,1.5-1.5Zm-3.5,10v-4c0-.551,.449-1,1-1h2v8c-1.654,0-3-1.346-3-3Zm20,0c0,1.654-1.346,3-3,3V14h2c.551,0,1,.449,1,1v4ZM3,2.5C3,1.119,4.119,0,5.5,0s2.5,1.119,2.5,2.5-1.119,2.5-2.5,2.5-2.5-1.119-2.5-2.5Zm16-1.328v-.169c-.002-.552,.444-1.001,.997-1.003h.003c.551,0,.999,.446,1,.997v.172c0,.638,.258,1.261,.708,1.71,.833,.833,1.293,1.941,1.293,3.121,0,.552-.448,1-1,1s-1-.448-1-1c0-.645-.251-1.251-.707-1.707-.834-.834-1.293-1.942-1.293-3.122Zm-2.707,3.814c-.834-.834-1.293-1.942-1.293-3.122v-.864c0-.552,.448-1,1-1s1,.448,1,1v.864c0,.635,.258,1.258,.707,1.707,.833,.833,1.293,1.941,1.293,3.121v.308c0,.552-.448,1-1,1s-1-.448-1-1v-.308c0-.645-.251-1.251-.707-1.707Z"></path>
                </svg>
              </div>
              <div className="my-auto mx-4 text-[20px] font-normal">
                {listing.bathrooms} Bathrooms
              </div>
            </div>
          </div>
          <div className="w-full py-4 flex-row md:flex">
            <div className="md:w-1/2 md:px-0 px-3 text-justify md:text-left">
              <div className="w-full">
                <div className="text-[1.25rem] leading-[1.2] font-medium">
                  Description
                </div>
                <div className="mt-7 text-[15px] text-neutral-800">
                  {listing.description}
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:ml-4">
              <div className="w-full h-full">
                <div className="bg-lime-700/50 p-2 h-full text-left px-4">
                  <div className="text-[1.25rem] leading-[1.2] font-medium py-4">
                    Need more details?
                  </div>
                  <div className="text-[16px] text-neutral-900">
                    Make an appointment with the real estate broker's to see
                    property.
                  </div>
                  <div className="pt-5">
                    <div className="w-fit bg-lime-700 p-1 cursor-pointer py-2 transition-all ease-in-out dealay-150 hover:bg-lime-700/90 duration-300 ">
                      <div className="flex-row flex w-full">
                        <div className="text-white ml-4 text-[19px]">
                          Make an appointment
                        </div>
                        <div className="mr-2 ml-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Outline"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="white"
                          >
                            <path d="M24,2V10h-2V3.414l-12.793,12.793-1.414-1.414L20.586,2h-6.586V0h8c1.103,0,2,.897,2,2Zm-6,20H2V7c0-.551,.449-1,1-1H13.757l2-2H3c-1.654,0-3,1.346-3,3V24H20V8.243l-2,2v11.757Z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full"></div>
          {listing.latitude && <ListingLocation listing={listing} />}
        </div>
      </div>
      <div className="w-full pt-10">
        <Footer />
      </div>
    </div>
  );
};
