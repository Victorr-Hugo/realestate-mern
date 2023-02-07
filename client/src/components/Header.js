import React, { useState } from 'react';

import logo from '../resources/logo.png';

const Header = () => {
    const [ lenguageOptions, setLenguageOptions ] = useState(false);

  return (
    <header className='block w-full'>
        <div className='m-0 w-full block relative'>
            <div className='fixed z-50 flex top-0 right-0 bg-white shadow left-0 h-[66px] px-10 items-center min-w-full w-full my-0 mx-auto text-[#1b1b1b] flex-row box-border'>
                <a href='/' className='h-20 w-32 flex items-center'>
                    <img alt='logo' src={logo} className='object-cover'/>
                </a>
                <div className='w-full h-full relative'>
                    <div className='absolute right-0 top-1/4 justify-center items-center flex-row flex font-medium text-[1rem]'>
                        <a href='#' className='mx-2'>Search</a>
                        <a href='create' className='mx-2'>Sell</a>
                        <a href='#' className='mx-2'>My broker</a>
                        <a href='#' className='mx-2'>Tools</a>
                        <div onClick={() => setLenguageOptions(!lenguageOptions)} className='border-[2px] rounded-[9px] py-1 px-3 cursor-pointer mx-2 flex-row flex box-border'>
                            <div className='px-1'>English</div>
                            <div>
                                <svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 24 24' width='24' height='24'>
                                    {lenguageOptions ? (
                                        <path d='M17.293,15.207,12,9.914,6.707,15.207,5.293,13.793,10.586,8.5a2,2,0,0,1,2.828,0l5.293,5.293Z'></path>
                                    ):(
                                        <path d='M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z'></path>
                                    )}
                                </svg>
                            </div>
                        </div>
                        <div className='bg-[#1b1b1b] rounded-[3px] py-1 px-3 cursor-pointer mx-2 flex-row flex box-border'>
                            <div className='px-1 text-white'>Sign in</div>
                            <div className='m-auto'>
                                <svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 24 24' width='20' height='20' className='block m-auto' fill='white'>
                                    <path d='M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z'></path>
                                    <circle cx='12' cy='6' r='6'></circle>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header