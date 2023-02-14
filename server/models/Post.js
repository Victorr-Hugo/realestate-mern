import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    coverImage: {
      url: String,
      public_id: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brokers",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Posts", postSchema);
