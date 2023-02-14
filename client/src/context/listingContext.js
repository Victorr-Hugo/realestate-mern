import { createContext, useContext, useEffect, useState } from "react";
import {
  createListingRequest,
  getHousesFeedRequest,
  getListingRequest,
  getListingsRequest,
  getQueryResultsRequest,
} from "../api/Map";

const listingContext = createContext();

export const useListings = () => {
  const context = useContext(listingContext);
  if (!context) throw new Error("Listing Provider is missing");
  return context;
};

export const ListingProvider = ({ children }) => {
  const getListings = async () => {
    try {
      const res = await getListingsRequest();
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getListing = async (id) => {
    try {
      const res = await getListingRequest(id);
      return res?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getHomeFeed = async () => {
    try {
      const res = await getHousesFeedRequest();
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteListing = async (id) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const createListing = async (listing) => {
    try {
      await createListingRequest(listing);
    } catch (error) {
      console.error(error);
    }
  };

  const updateListing = async (id, listing) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const getQueryResults = async (values) => {
    try {
      const res = await getQueryResultsRequest(values);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <listingContext.Provider
      value={{
        getListings,
        deleteListing,
        createListing,
        updateListing,
        getHomeFeed,
        getQueryResults,
        getListing,
      }}
    >
      {children}
    </listingContext.Provider>
  );
};
