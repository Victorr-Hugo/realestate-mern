import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  broker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brokers",
  },
  country: {
    type: String,
    required: true,
  },
  neighbourhood: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  types: {
    type: Array,
  },
  features: {
    type: Array,
  },
  displayImages: [
    {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Houses", houseSchema);
