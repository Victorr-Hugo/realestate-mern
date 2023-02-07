import React from 'react';

const BlogSection = () => {
  return (
    <div className='py-20 text-left px-20 w-full'>
        <div className='font-medium pb-8'>BLOGS</div>
        <div className='w-full flex-row flex'>
            <div className='w-1/2 pr-[230px]'>
                <div className='text-[28px] font-bold'>Articles Related to Aesthetic Home Design</div>
            </div>
            <div className="w-1/2 relative">
                <div className="flex-row flex my-auto h-full absolute right-0 top-0 hover:underline cursor-pointer">
                <div className="my-auto px-2">Explore All Blogs</div>
                <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name='Isolation Mode' viewBox="0 0 24 24" width='24' height='24' fill="#1b1b1b" className="block m-auto">
                    <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"></path>
                </svg>
                </div>
            </div>
        </div>
        <div className='flex-row flex w-full py-14'>
            <div className='w-1/2 pr-10'>
                <div className='w-full'>
                    <img alt='' src='https://assets.architecturaldigest.in/photos/60084dd6cce5700439e12bf7/master/pass/modern-living-room-decor-1366x768.jpg' className='rounded-[16px]'/>
                    <div className='text-[15px] text-neutral-500 py-2'>August 20, 2022</div>
                    <div className='text-[27px] font-semibold'>You'll save time and money on trial-and-error decorating.</div>
                    <div className='text-[16px] py-2 text-neutral-600'>Knowing your home aesthetic means you get access to the years and years of interior design study done by professional decorators. No more having to see if the metal print of your favorite...</div>
                </div>
            </div>
            <div className='w-1/2 pl-10'>
                <div className='flex-col flex w-full'>
                    <div className='flex-row flex w-full h-1/4 py-4 border-b'>
                        <img alt='' src='https://st.hzcdn.com/simgs/pictures/living-rooms/hawthorn-east-daniela-fulford-photography-img~09c10b8b0fe05ca6_14-3329-1-9fdc4c6.jpg' className='w-1/3 rounded-[16px] h-[145px] object-cover'/>
                        <div className='flex-col flex w-1/2 pl-4'>
                            <div className='text-[15px] text-neutral-500 py-2'>August 20, 2022</div>
                            <div className='text-[15px] py-2 font-semibold'>Bohemian decor is among the most popular home aesthetics, and it's no surprise. The style is constructed...</div>
                        </div>
                    </div>
                    <div className='flex-row flex w-full h-1/4 py-4 border-b'>
                        <img alt='' src='https://st.hzcdn.com/simgs/pictures/living-rooms/hawthorn-east-daniela-fulford-photography-img~09c10b8b0fe05ca6_14-3329-1-9fdc4c6.jpg' className='w-1/3 rounded-[16px] h-[145px] object-cover'/>
                        <div className='flex-col flex w-1/2 pl-4'>
                            <div className='text-[15px] text-neutral-500 py-2'>August 20, 2022</div>
                            <div className='text-[15px] py-2 font-semibold'>Bohemian decor is among the most popular home aesthetics, and it's no surprise. The style is constructed...</div>
                        </div>
                    </div>
                    <div className='flex-row flex w-full h-1/4 py-4'>
                        <img alt='' src='https://st.hzcdn.com/simgs/pictures/living-rooms/hawthorn-east-daniela-fulford-photography-img~09c10b8b0fe05ca6_14-3329-1-9fdc4c6.jpg' className='w-1/3 rounded-[16px] h-[145px] object-cover'/>
                        <div className='flex-col flex w-1/2 pl-4'>
                            <div className='text-[15px] text-neutral-500 py-2'>August 20, 2022</div>
                            <div className='text-[15px] py-2 font-semibold'>Bohemian decor is among the most popular home aesthetics, and it's no surprise. The style is constructed...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default BlogSection;