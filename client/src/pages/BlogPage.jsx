import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../context/blogContext";

export const BlogPage = () => {
  const { posts } = useBlog();
  const navigate = useNavigate();
  const renderPosts = () => {
    if (posts.lenght === 0) {
      return <div>There are no posts</div>;
    } else {
      return (
        <div className="w-full grid-cols-4 grid gap-4 py-10">
          {posts.posts?.map((post) => (
            <div
              onClick={() => navigate("/blog/" + post._id)}
              className="w-full h-full cursor-pointer"
            >
              <div
                key={post._id}
                className="w-full min-h-full box-border text-left h-full max-h-full max-w-full p-1"
              >
                <img
                  alt=""
                  src={post.coverImage?.url}
                  className="min-h-full max-h-full h-full object-cover"
                />
                <div className="text-[14px] whitespace-nowrap text-ellipsis overflow-hidden w-full font-semibold">
                  {post.title}
                </div>
                <div className=" text-[14px] whitespace-nowrap text-ellipsis overflow-hidden w-full">
                  {post.summary}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="w-full px-10">
      <div className="w-full">
        <div className="w-full flex-row flex pt-10  text-left">
          <div className="w-1/2">
            <h1 className="text-[32px] leading-[32px] font-semibold">
              Tools for your house search.
            </h1>
            <div className="py-10 w-full pr-32">
              <div className="border rounded-[9px] flex-row flex">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="py-2 px-4 outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#050505] text-white rounded-[9px] w-full"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full my-auto">
            <div className="px-32 my-auto text-[20px] text-[#050505] font-medium">
              New product features, the latest in technology, solutions and
              updates.
            </div>
          </div>
        </div>
        <div className="w-full py-2 border-b">
          <div className="w-full flex-row flex"></div>
        </div>
        <div className="w-full py-4">{renderPosts()}</div>
      </div>
    </div>
  );
};
