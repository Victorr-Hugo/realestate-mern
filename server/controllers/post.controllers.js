import Post from "../models/Post.js";
import fs from "fs-extra";
import { v2 as cloudinary } from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../config.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "real-estate/blogs",
  });
};

const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const createPost = async (req, res) => {
  try {
    const { title, summary, content, author } = req.body;
    let coverImage = null;
    if (req.files?.coverImage) {
      const result = await uploadImage(req.files.coverImage.tempFilePath);
      await fs.remove(req.files.coverImage.tempFilePath);
      coverImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({ title, summary, content, author, coverImage });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author");
    if (!post) return res.sendStatus(404);
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (post && post.coverImage.public_id) {
      await deleteImage(post.coverImage.public_id);
    }
    if (!post) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLandFeed = async (req, res) => {
  try {
    const posts = await Post.aggregate([{ $sample: { size: 4 } }]);
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFeed = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const postsPerPage = 20;
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const posts = await Post.find({})
      .skip((page - 1) * postsPerPage)
      .limit(postsPerPage)
      .sort({ createdAt: -1 });

    return res.json({
      posts,
      currentPage: parseInt(page),
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
