import axios from "axios";

export const getLandFeedRequest = async () =>
  await axios.get("https://realestate-mern.onrender.com/api/posts/landfeed");

export const getBlogFeedRequest = async () =>
  await axios.get("https://realestate-mern.onrender.com/api/posts/feed");

export const getPostRequest = async (id) =>
  await axios.get("https://realestate-mern.onrender.com/api/posts/" + id);
