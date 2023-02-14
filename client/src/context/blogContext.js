import { createContext, useContext, useEffect, useState } from "react";
import {
  getBlogFeedRequest,
  getLandFeedRequest,
  getPostRequest,
} from "../api/Blog";

const blogContext = createContext();

export const useBlog = () => {
  const context = useContext(blogContext);
  if (!context) throw new Error("Blog Provider is missing");
  return context;
};

export const BlogProvider = ({ children }) => {
  const [landPagePosts, setLandPagePosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getLandFeedRequest();
      setLandPagePosts(res.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getBlogFeedRequest();
      setPosts(res.data);
    })();
  }, []);

  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <blogContext.Provider value={{ landPagePosts, posts, getPost }}>
      {children}
    </blogContext.Provider>
  );
};
