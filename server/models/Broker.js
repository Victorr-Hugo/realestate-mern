import mongoose from "mongoose";

const brokerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  moreInfo: {
    type: String,
    required: true,
  },
  education: [],
  languages: [],
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    url: String,
    public_id: String,
  },
  listings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Houses",
    },
  ],
});

export default mongoose.model("Brokers", brokerSchema);
