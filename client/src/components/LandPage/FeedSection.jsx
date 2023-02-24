import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListings } from "../../context/listingContext";

const FeedSection = () => {
  const { getHomeFeed } = useListings();
  const [feed, setFeed] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await getHomeFeed();
      setFeed(res);
    })();
  }, []);

  return (
    <div className="py-20 text-left sm:px-10 md::px-20 px-3 w-full bg-slate-100">
      <div className="text-left text-[18px] text-lime-700 font-medium py-2">
        PROPERTY
      </div>
      <div className="w-full flex-row md:flex">
        <div className="md:w-1/2 md:pr-[230px]">
                <div className="text-[28px] font-bold">
          Property in Cities and Provinces
        </div>
    </div>
        <div className="md:w-1/2 relative">
         <div className="flex-row flex my-auto h-full absolute right-0 top-0 hover:underline cursor-pointer">
            <div
              onClick={() => navigate("/properties")}
              className="my-auto px-2">
              Explore All Properties
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Isolation_Mode"
              data-name="Isolation Mode"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#1b1b1b"
              className="block m-auto"
            >
              <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="py-20 w-full">
        <div className="w-full md:grid-cols-4 sm:grid-cols-2 grid-cols-1 grid gap-6">
          {feed.map((listing) => (
            <div
              onClick={() => navigate("/properties/" + listing._id)}
              key={listing._id}
              className="bg-white p-2 rounded-[9px] shadow cursor-pointer"
            >
              <img
                alt=""
                src={listing.displayImages?.[0].url}
                className="rounded-[9px] object-cover h-[210px] w-full"
              />
              <div className="w-full flex-row flex my-1">
                <div className="bg-neutral-100 text-neutral-500 font-medium text-[12px] rounded-full px-3 py-[2px] mx-1 my-1 whitespace-nowrap text-ellipsis overflow-hidden w-1/3 max-w-[33.3%]">
                  {listing.types &&
                    listing.types
                      .filter((type) => type !== null)
                      .map(
                        (type, index) =>
                          index === 0 && <p key={index}>{type}</p>
                      )}
                </div>
                <div className="bg-neutral-100 text-neutral-500 font-medium text-[12px] rounded-full px-3 py-[2px] mx-1 my-1">
                  {listing.types &&
                    (listing.types[1] ? (
                      listing.types
                        .filter((type) => type !== null)
                        .map(
                          (type, index) =>
                            index === 1 && <p key={index}>{type}</p>
                        )
                    ) : (
                      <p>negotiable</p>
                    ))}
                </div>
              </div>
              <div className="text-[20px] text-left font-semibold px-2 py-1">
                ${new Intl.NumberFormat().format(listing.price)}
              </div>
              <div className="text-left text-[15px] px-2 whitespace-nowrap text-ellipsis overflow-hidden">
                {listing.description}
              </div>
              <div className="flex-row flex w-full py-1">
                <div className="bg-neutral-100 text-neutral-500 font-medium text-[12px] rounded-full px-3 py-[2px] mx-1 my-1">
                  {listing.bedrooms} bedroom
                </div>
                <div className="bg-neutral-100 text-neutral-500 font-medium text-[12px] rounded-full px-3 py-[2px] mx-1 my-1">
                  {listing.bathrooms} bathroom
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedSection;
