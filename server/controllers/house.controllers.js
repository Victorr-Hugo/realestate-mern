import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import House from "../models/House.js";
import Broker from "../models/Broker.js";
import fs from "fs-extra";

export const getListings = async (req, res) => {
  try {
    const listings = await House.find({});
    return res.json(listings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createListing = async (req, res) => {
  try {
    const {
      name,
      country,
      neighbourhood,
      city,
      street,
      county,
      bedrooms,
      bathrooms,
      year_build,
      description,
      latitude,
      longitude,
      room_type,
      price,
      type_all,
      type_building,
      type_apartment,
      type_office,
      type_shop,
      type_house,
      features_climatizer,
      features_dishwasher,
      features_balcony,
      features_fitness,
      features_office,
      features_shop,
      features_house,
      features_basement,
    } = req.body;

    const displayImages = [];

    for (let i = 1; i <= 6; i++) {
      if (req.files?.[`display_image_${i}`]) {
        const result = await uploadImage(
          req.files[`display_image_${i}`].tempFilePath
        );
        await fs.remove(req.files[`display_image_${i}`].tempFilePath);
        displayImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }
    const newHouse = new House({
      name,
      country,
      neighbourhood,
      city,
      street,
      county,
      bedrooms,
      bathrooms,
      year_build,
      description,
      latitude,
      longitude,
      room_type,
      price: parseFloat(price),
      types: [
        type_all ? "all" : null,
        type_building ? "building" : null,
        type_apartment ? "apartment" : null,
        type_office ? "office" : null,
        type_shop ? "shop" : null,
        type_house ? "house" : null,
      ],
      features: [
        features_climatizer ? "central air conditioner / heating" : null,
        features_dishwasher ? "dishwasher" : null,
        features_balcony ? "balcony" : null,
        features_fitness ? "fitness" : null,
        features_office ? "office" : null,
        features_shop ? "shop" : null,
        features_basement ? "basement" : null,
      ],
      displayImages,
    });
    await newHouse.save();
    return res.status(200).json({ message: newHouse });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await House.findById(id);
    return res.json(listing);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await House.findByIdAndDelete(id);
    if (!listing) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedListing = await House.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.json(updatedListing);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getHomeFeed = async (req, res) => {
  try {
    const listings = await House.aggregate([{ $sample: { size: 8 } }]);
    return res.json(listings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getQueryResults = async (req, res) => {
  try {
    const query = {};
    console.log(req.body);

    if (req.body.description) {
      query.name = { $regex: req.body.description, $options: "i" };
    }

    if (req.body.features_climatizer === "true") {
      query["features"] = {
        $elemMatch: { $eq: "central air conditioner / heating" },
      };
    }

    if (req.body.features_dishwasher === "true") {
      query["features"] = { $elemMatch: { $eq: "dishwasher" } };
    }

    if (req.body.features_balcony === "true") {
      query["features"] = { $elemMatch: { $eq: "balcony" } };
    }

    if (req.body.features_fitness === "true") {
      query["features"] = { $elemMatch: { $eq: "fitness" } };
    }
    if (req.body.features_office === "true") {
      query["features"] = { $elemMatch: { $eq: "office" } };
    }
    if (req.body.features_shop === "true") {
      query["features"] = { $elemMatch: { $eq: "shop" } };
    }
    if (req.body.features_basement === "true") {
      query["features"] = { $elemMatch: { $eq: "basement" } };
    }
    if (req.body.type_all) {
      query["types"] = { $elemMatch: { $eq: "building" } };
      query["types"] = { $elemMatch: { $eq: "apartment" } };
      query["types"] = { $elemMatch: { $eq: "office" } };
      query["types"] = { $elemMatch: { $eq: "shop" } };
      query["types"] = { $elemMatch: { $eq: "house" } };
    }

    if (req.body.type_apartment === "true") {
      query["types"] = { $elemMatch: { $eq: "apartment" } };
    }
    if (req.body.type_building === "true") {
      query["types"] = { $elemMatch: { $eq: "building" } };
    }
    if (req.body.type_house === "true") {
      query["types"] = { $elemMatch: { $eq: "house" } };
    }
    if (req.body.type_shop === "true") {
      query["types"] = { $elemMatch: { $eq: "shop" } };
    }
    if (req.body.type_office === "true") {
      query["types"] = { $elemMatch: { $eq: "office" } };
    }

    if (req.body.minPrice) {
      query.price = { $gte: parseInt(req.body.minPrice) };
    }

    if (req.body.maxPrice) {
      if (!query.price) {
        query.price = { $lt: parseInt(req.body.maxPrice) };
      } else {
        query.price = { ...query.price, $lt: parseInt(req.body.maxPrice) };
      }
    }

    if (req.body.minBathrooms) {
      query.bathrooms = { $gte: parseInt(req.body.minBathrooms) };
    }

    if (req.body.maxBathrooms) {
      if (!query.bathrooms) {
        query.bathrooms = { $lt: parseInt(req.body.maxBathrooms) };
      } else {
        query.bathrooms = {
          ...query.bathrooms,
          $lt: parseInt(req.body.maxBathrooms),
        };
      }
    }

    if (req.body.minBedrooms) {
      query.bedrooms = { $gte: parseInt(req.body.minBedrooms) };
    }

    if (req.body.maxBedrooms) {
      if (!query.bedrooms) {
        query.bedrooms = { $lt: parseInt(req.body.maxBedrooms) };
      } else {
        query.bedrooms = {
          ...query.bedrooms,
          $lt: parseInt(req.body.maxBedrooms),
        };
      }
    }
    console.log(query);

    const properties = await House.find(query);
    return res.json(properties);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
