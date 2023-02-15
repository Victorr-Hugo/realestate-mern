import axios from "axios";

export const getListingsRequest = async () => await axios.get("/api/houses");
export const getHousesFeedRequest = async () =>
  await axios.get("/api/houses/feed");
export const getListingRequest = async (id) =>
  await axios.get("/api/houses/" + id);

export const searchForLocation = async (location) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: location,
          format: "json",
        },
      }
    );

    const data = response.data;
    if (data.length > 0) {
      console.log(data);
      const firstResult = data[0];
      return [firstResult.lat, firstResult.lon];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getAddress = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createListingRequest = async (values) => {
  try {
    const form = new FormData();
    for (let key in values) {
      form.append(key, values[key]);
    }
    return await axios.post("/api/houses", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getQueryResultsRequest = async (values) => {
  try {
    const form = new FormData();
    for (let key in values) {
      form.append(key, values[key]);
    }
    return await axios.post("/api/houses/query", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
