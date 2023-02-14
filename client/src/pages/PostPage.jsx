import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlog } from "../context/blogContext";

export const PostPage = () => {
  const { getPost } = useBlog();
  const [post, setPost] = useState({});
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const res = await getPost(params.id);
        setPost(res);
      }
    })();
  }, [params.id, setPost]);

  return (
    <div className="w-full h-full text-left">
      <div className="w-full h-full p-10">
        <div className="w-full h-full">
          <h1 className="text-[29px] font-semibold">{post.title}</h1>
          <div className="w-full">
            <img
              alt=""
              src={post.coverImage?.url}
              className="h-[321px] w-full rounded-[9px] object-cover"
            />
          </div>
          <div className="w-full py-2 flex-row flex">
            <img
              alt=""
              src={post.author?.profilePic?.url}
              className="rounded-full w-10 h-10 object-cover"
            />
            <div className="my-auto px-3 font-semibold">
              <div>
                {post.author?.firstName} {post.author?.lastName}
              </div>
              <p className="text-[12px] font-normal">Real estate broker</p>
            </div>
          </div>
          <div className="w-full py-4">
            <div className="text-justify px-32">{post.summary}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
