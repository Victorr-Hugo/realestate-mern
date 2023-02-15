import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../../context/blogContext";

const BlogSection = () => {
  const { landPagePosts } = useBlog();
  const navigate = useNavigate();

  return (
    <div className="py-20 text-left sm:px-10 md::px-20 px-3 w-full">
      <div className="font-medium pb-8">BLOGS</div>
      <div className="w-full flex-row md:flex">
        <div className="md:w-1/2 md:pr-[230px]">
          <div className="text-[28px] font-bold">
            Articles Related to Aesthetic Home Design
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="flex-row flex my-auto h-full absolute right-0 top-0 hover:underline cursor-pointer">
            <div onClick={() => navigate("/login")} className="my-auto px-2">
              Explore All Blogs
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
      <div className="flex-row md:flex w-full py-14">
        <div className="md:w-1/2 md:pr-10">
          <div
            onClick={() => navigate("/blog/" + landPagePosts?.[0]?._id)}
            className="w-full cursor-pointer"
          >
            <img
              alt=""
              src={landPagePosts?.[0]?.coverImage?.url}
              className="rounded-[16px]"
            />
            <div className="text-[15px] text-neutral-500 py-2">
              August 20, 2022
            </div>
            <div className="text-[27px] font-semibold">
              {landPagePosts?.[0]?.title}
            </div>
            <div className="text-[16px] py-2 text-neutral-600">
              {landPagePosts?.[0]?.summary}
            </div>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-10">
          <div className="flex-col flex w-full ">
            <div
              onClick={() => navigate("/blog/" + landPagePosts?.[1]._id)}
              className="flex-row flex w-full h-1/4  cursor-pointer py-4 border-b"
            >
              <img
                alt=""
                src={landPagePosts?.[1]?.coverImage?.url}
                className="w-1/3 rounded-[16px] h-[145px] object-cover"
              />
              <div className="flex-col flex w-1/2 pl-4">
                <div className="text-[15px] text-neutral-500 py-2">
                  August 20, 2022
                </div>
                <div className="text-[15px] py-2 font-semibold">
                  {landPagePosts?.[1]?.title}
                </div>
              </div>
            </div>
            <div
              onClick={() => navigate("/blog/" + landPagePosts?.[2]?._id)}
              className="flex-row flex w-full h-1/4 py-4 border-b  cursor-pointer"
            >
              <img
                alt=""
                src={landPagePosts?.[2]?.coverImage?.url}
                className="w-1/3 rounded-[16px] h-[145px] object-cover"
              />
              <div className="flex-col flex w-1/2 pl-4">
                <div className="text-[15px] text-neutral-500 py-2">
                  August 20, 2022
                </div>
                <div className="text-[15px] py-2 font-semibold">
                  {landPagePosts?.[2]?.title}
                </div>
              </div>
            </div>
            <div
              onClick={() => navigate("/blog/" + landPagePosts?.[3]?._id)}
              className="flex-row flex w-full h-1/4 py-4 border-b cursor-pointer"
            >
              <img
                alt=""
                src={landPagePosts?.[3]?.coverImage?.url}
                className="w-1/3 rounded-[16px] h-[145px] object-cover"
              />
              <div className="flex-col flex w-1/2 pl-4">
                <div className="text-[15px] text-neutral-500 py-2">
                  August 20, 2022
                </div>
                <div className="text-[15px] py-2 font-semibold">
                  {landPagePosts?.[3]?.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
