import axios from "axios";

export const getLandFeedRequest = async () =>
  await axios.get("/api/posts/landfeed");

export const getBlogFeedRequest = async () =>
  await axios.get("/api/posts/feed");

export const getPostRequest = async (id) => await axios.get("/api/posts/" + id);
