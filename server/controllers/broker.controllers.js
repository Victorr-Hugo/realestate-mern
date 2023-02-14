import Broker from "../models/Broker.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs-extra";
import { API_KEY, API_SECRET, CLOUD_NAME, SECRET } from "../config.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "real-estate/brokers",
  });
};

const createToken = (id) => {
  return jwt.sign({ id }, SECRET, { expiresIn: "7d" });
};

const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const signUpBroker = async (req, res) => {
  try {
    const { firstName, lastName, moreInfo, languages, bio, email, password } =
      req.body;
    let education = [];
    for (let key in req.body) {
      if (key.startsWith("education")) {
        let educationIndex = parseInt(key.split("[")[1].split("]")[0]);
        let educationKey = key.split(".")[1];
        if (!education[educationIndex]) {
          education[educationIndex] = {};
        }
        education[educationIndex][educationKey] = req.body[key];
      }
    }
    let profilePic = null;
    const emailTaken = await Broker.findOne({ email });
    if (emailTaken) return res.status(409);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    if (req.files?.profilePic) {
      const result = await uploadImage(req.files.profilePic.tempFilePath);
      await fs.remove(req.files.profilePic.tempFilePath);
      profilePic = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } else {
      profilePic = {
        url: "https://i.stack.imgur.com/l60Hf.png",
        public_id: firstName,
      };
    }
    const broker = new Broker({
      firstName,
      lastName,
      moreInfo,
      education,
      languages,
      bio,
      email,
      password: hash,
      profilePic,
    });
    await broker.save();
    const token = createToken(broker._id);
    return res.status(200).json({ broker: broker._id, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signInBroker = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if the broker exists
    const broker = await Broker.findOne({ email });
    //if not exists send status 404
    if (!broker) return res.sendStatus(404);
    //if exists then check if password is correct
    const match = await bcrypt.compare(password, broker.password);
    if (!match) return res.sendStatus(500);
    //if password is correct send data to the frontend
    const token = createToken(broker._id);
    return res.status(200).json({ broker: broker._id, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBroker = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.files?.profilePic) {
      const result = await uploadImage(req.files.uploadImage.tempFilePath);
      await fs.remove(req.files.profilePic.tempFilePath);
      req.body.profilePic = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedBroker = await Broker.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.json(updatedBroker);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBroker = async (req, res) => {
  try {
    const { id } = req.params;
    const broker = await Broker.findByIdAndDelete(id);

    if (broker && broker.profilePic) {
      await deleteImage(broker.profilePic.public_id);
    }
    if (!broker) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBroker = async (req, res) => {
  try {
    const { id } = req.params;
    const broker = await Broker.findById(id).populate("listings");
    if (!broker) return res.sendStatus(404);
    return res.json(broker);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBrokers = async (req, res) => {
  try {
    const brokers = await Broker.find({});
    return res.json(brokers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
