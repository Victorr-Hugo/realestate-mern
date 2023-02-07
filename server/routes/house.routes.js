import { Router } from "express";
import { 
    getListings,
    createListing,
    getListing,
    removeListing,
    updateListing,
    getHomeFeed,
    getQueryResults,
} from "../controllers/house.controllers.js";

const router = Router();

router.get('/houses', getListings);
router.get('/houses/feed', getHomeFeed);
router.get('/houses/:id', getListing);
router.delete('/houses/:id', removeListing);
router.put('/houses/:id', updateListing);
router.post('/houses', createListing);
router.post('/houses/query', getQueryResults);

export default router;