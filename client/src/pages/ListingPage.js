import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useListings } from "../context/listingContext";

export const ListingPage = () => {
    const { getListing } = useListings();
    const [listing, setListing] = useState({});
    const params = useParams();

    useEffect(() => {
        (async() => {
            if(params.id){
                const res = await getListing(params.id);
                setListing(res);
            }
        })();
    }, [params.id, getListing]);

  return (
    <div className='w-full px-10 pt-10'>
        <div className='shadow w-full text-left'>
            <div className='flex-row flex p-3 w-full'>
                <div className='flex-col flex w-1/2'>
                    <div className='text-[18px] font-extrabold'>House for Sale</div>
                    <div className='text-[15px]'>{listing.name}</div>
                </div>
                <div className='w-1/2 '>
                    <div className='w-full flex-row flex h-full'>
                        <div className='w-1/3 px-4 border-r text-[22px] font-extrabold'>
                        ${new Intl.NumberFormat().format(listing.price)}
                        </div>
                        <div className='w-1/3 h-full'>
                            <svg xmlns='http://www.w3.org/2000/svg' id='Isolation_Mode' data-name='Isolation Mode' viewBox='0 0 24 24' width='40' height='40' className='m-auto h-full' fill='#475569'>
                                <path d='M19.333,14.667a4.66,4.66,0,0,0-3.839,2.024L8.985,13.752a4.574,4.574,0,0,0,.005-3.488l6.5-2.954a4.66,4.66,0,1,0-.827-2.643,4.633,4.633,0,0,0,.08.786L7.833,8.593a4.668,4.668,0,1,0-.015,6.827l6.928,3.128a4.736,4.736,0,0,0-.079.785,4.667,4.667,0,1,0,4.666-4.666ZM19.333,2a2.667,2.667,0,1,1-2.666,2.667A2.669,2.669,0,0,1,19.333,2ZM4.667,14.667A2.667,2.667,0,1,1,7.333,12,2.67,2.67,0,0,1,4.667,14.667ZM19.333,22A2.667,2.667,0,1,1,22,19.333,2.669,2.669,0,0,1,19.333,22Z'></path>
                            </svg>
                        </div>
                        <div className='bg-lime-700/40 w-full h-full justify-center items-center'>
                            <div className='w-full h-full'>
                                <div className='text-white m-auto text-center my-auto h-full text-[18px] font-semibold'>Contact the real estate broker</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex-row flex'>
                <div className='w-1/2 mr-1'>
                    <img alt='' src={listing.displayImages?.[0].url} className='w-full h-full'/>
                </div>
                <div className='w-1/2 ml-1'>
                    <div className='w-full grid grid-cols-2 gap-2'>
                        <img alt='' src={listing.displayImages?.[1].url} className=''/>
                        <img alt='' src={listing.displayImages?.[2].url} className=''/>
                        <img alt='' src={listing.displayImages?.[3].url} className=' '/>
                        <img alt='' src={listing.displayImages?.[4].url} className=' '/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};