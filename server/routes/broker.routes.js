import { Router } from "express";
import {
  deleteBroker,
  getBroker,
  getBrokers,
  signInBroker,
  signUpBroker,
  updateBroker,
} from "../controllers/broker.controllers.js";

const router = Router();

router.get("/brokers", getBrokers);
router.get("/brokers/:id", getBroker);
router.post("/brokers/signup", signUpBroker);
router.post("/brokers/signin", signInBroker);
router.put("/brokers/:id", updateBroker);
router.delete("/brokers/:id", deleteBroker);

export default router;
