import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getAddress, searchForLocation } from "../api/Map";
import L from "leaflet";
import { useListings } from "../context/listingContext";

import bathroom_icon from "../resources/bathroom-icon.png";
import beedroom_icon from "../resources/bedroom-icon.png";
export const ListingsPage = () => {
  const { getListings, getQueryResults } = useListings();
  const [renderMap, setRenderMap] = useState(false);
  const [center, setCenter] = useState([45.5360167, -73.6477151, 11.75]);
  const [markerPos, setMarkerPos] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await getListings();
      setListings(res);
    })();
  }, []);

  useEffect(() => {
    setRenderMap(false);
    setTimeout(() => setRenderMap(true), 0);
  }, [center]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const result = await searchForLocation(searchTerm);
      if (result) {
        console.log(result);
        setCenter(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Markers = () => {
    useMapEvent({
      click(e) {
        setMarkerPos([e.latlng.lat, e.latlng.lng]);
      },
    });
    return listings.map((listing) => {
      return (
        <Marker
          key={listing._id}
          position={[listing.latitude, listing.longitude]}
        >
          <Popup>
            <div
              onClick={() => navigate("/properties/" + listing._id)}
              className="bg-white flex-row flex p-1 h-[73px] w-[213px] cursor-pointer"
            >
              <img
                alt=""
                src={listing.displayImages?.[0].url}
                className="w-1/3 cursor-pointer h-full object-cover rounded-[9px]"
              />
              <div className="w-2/3 flex-col flex px-2">
                <div className="text-[15px] font-semibold">
                  {listing.street}
                </div>
                <div className="text-neutral-700 text-[13px]">
                  {listing.city} - {listing.country}
                </div>
                <div className="text-lime-700 font-semibold text-[17px]">
                  ${new Intl.NumberFormat().format(listing.price)}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      );
    });
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute h-full z-[9999] flex-row hidden sm:flex">
        <div className="h-full w-[321px] p-3 bg-white border-t text-left">
          <div className="font-semibold text-[16px]">Filter</div>
          <Formik
            initialValues={{
              name: "",
              country: "",
              neighbourhood: "",
              city: "",
              street: "",
              county: "",
              minBedrooms: "",
              minBathrooms: "",
              year_build: "",
              description: "",
              latitude: "",
              longitude: "",
              minPrice: "",
              maxPrice: "",
              type_all: false,
              type_building: false,
              type_apartment: false,
              type_office: false,
              type_shop: false,
              type_house: false,
              features_climatizer: false,
              features_dishwasher: false,
              features_balcony: false,
              features_fitness: false,
              features_office: false,
              features_shop: false,
              features_basement: false,
            }}
            enableReinitialize
            onSubmit={async (values, actions) => {
              const res = await getQueryResults(values);
              console.log(res);
              setListings(res);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({ setFieldValue, isSubmitting, handleSubmit, values }) => (
              <Form
                onSubmit={handleSubmit}
                className="px-3 text-left py-2 overflow-auto w-full h-full sm:block hidden"
              >
                <div className="w-full flex-row flex">
                  <div className="flex-col flex w-full pr-2">
                    <div className="text-neutral-500 text-[13px] py-2 px-2">
                      LOCATION
                    </div>
                    <div className="flex-row flex w-full rounded-[9px] border pl-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Isolation_Mode"
                        data-name="Isolation Mode"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        className="my-auto h-full"
                        fill="#475569"
                      >
                        <path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z"></path>
                      </svg>
                      <Field
                        name="description"
                        placeholder="Street, Neighbourhood"
                        className="my-1  pl-5 py-2 px-4 outline-none mr-2 w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-col py-3 flex w-full">
                  <div
                    className="text-neutral-500 text-[13px] py-2 px-2"
                    id="checkbox-group"
                  >
                    TYPE OF LISTING
                  </div>
                  <div
                    className="w-full flex-row flex px-4"
                    role="group"
                    aria-labelledby="checkbox-group"
                  >
                    <div className="w-1/2 flex-col flex">
                      <label>
                        <input
                          type="checkbox"
                          checked={values.type_all}
                          onChange={(e) =>
                            setFieldValue("type_all", e.target.checked)
                          }
                          className="mr-2"
                        />
                        All
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={values.type_building}
                          onChange={(e) =>
                            setFieldValue("type_building", e.target.checked)
                          }
                          className="mr-2"
                        />
                        Building
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={values.type_apartment}
                          onChange={(e) =>
                            setFieldValue("type_apartment", e.target.checked)
                          }
                          className="mr-2"
                        />
                        Apartment
                      </label>
                    </div>
                    <div className="w-1/2 flex-col flex">
                      <label>
                        <input
                          type="checkbox"
                          checked={values.type_office}
                          onChange={(e) =>
                            setFieldValue("type_office", e.target.checked)
                          }
                          className="mr-2"
                        />
                        Office
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={values.type_shop}
                          onChange={(e) =>
                            setFieldValue("type_shop", e.target.checked)
                          }
                          className="mr-2"
                        />
                        Shop
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={values.type_house}
                          onChange={(e) =>
                            setFieldValue("type_house", e.target.checked)
                          }
                          className="mr-2"
                        />
                        House
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex-col flex py-2 w-full">
                  <div
                    className="text-neutral-500 text-[13px] py-2 px-2"
                    id="checkbox-group"
                  >
                    Bathrooms & Bedrooms
                  </div>
                  <div className="flex-row flex w-full px-2">
                    <div className="border rounded-[9px] w-1/2 mr-3 flex-row flex">
                      <img
                        alt=""
                        src={bathroom_icon}
                        className="w-6 h-6 m-auto mx-1"
                      />
                      <Field
                        name="minBathrooms"
                        className="outline-none bg-transparent px-2 py-[6px] w-full"
                        placeholder="Min Number of Bathrooms"
                      />
                    </div>
                    <div className="border rounded-[9px] w-1/2 ml-3 flex-row flex">
                      <img
                        alt=""
                        src={beedroom_icon}
                        className="w-6 h-6 m-auto mx-1"
                      />
                      <Field
                        name="minBedrooms"
                        className="outline-none bg-transparent px-2 py-[6px] w-full"
                        placeholder="Min number of Bedrooms"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-col flex py-2 w-full">
                  <div
                    className="text-neutral-500 text-[13px] py-2 px-2"
                    id="checkbox-group"
                  >
                    PRICE RANGE
                  </div>
                  <div className="flex-row flex w-full px-2">
                    <div className="border rounded-[9px] w-1/2 mr-3 flex-row flex">
                      <div className="w-6 h-6 m-auto mx-1">
                        <svg
                          cmlns="http://www.w3.org/2000/svg"
                          id="Layer_1"
                          data-name="Layer 1"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,22c-5.514,0-10-4.486-10-10S6.486,2,12,2s10,4.486,10,10-4.486,10-10,10Zm4-8c0,1.654-1.346,3-3,3v1c0,.553-.447,1-1,1s-1-.447-1-1v-1h-.268c-1.067,0-2.063-.574-2.598-1.499-.277-.479-.113-1.09,.364-1.366,.479-.279,1.091-.113,1.366,.364,.179,.31,.511,.501,.867,.501h2.268c.552,0,1-.448,1-1,0-.378-.271-.698-.644-.76l-3.041-.507c-1.342-.223-2.315-1.373-2.315-2.733,0-1.654,1.346-3,3-3v-1c0-.552,.447-1,1-1s1,.448,1,1v1h.268c1.067,0,2.063,.575,2.598,1.5,.277,.478,.113,1.089-.364,1.366-.48,.277-1.091,.113-1.366-.365-.179-.309-.511-.5-.867-.5h-2.268c-.552,0-1,.449-1,1,0,.378,.271,.698,.644,.76l3.041,.507c1.342,.223,2.315,1.373,2.315,2.733Z"></path>
                        </svg>
                      </div>
                      <Field
                        name="minPrice"
                        className="outline-none bg-transparent px-2 py-[6px] w-full"
                        placeholder="Min Price"
                      />
                    </div>
                    <div className="border rounded-[9px] w-1/2 ml-3 flex-row flex">
                      <div className="w-6 h-6 m-auto mx-1">
                        <svg
                          cmlns="http://www.w3.org/2000/svg"
                          id="Layer_1"
                          data-name="Layer 1"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,22c-5.514,0-10-4.486-10-10S6.486,2,12,2s10,4.486,10,10-4.486,10-10,10Zm4-8c0,1.654-1.346,3-3,3v1c0,.553-.447,1-1,1s-1-.447-1-1v-1h-.268c-1.067,0-2.063-.574-2.598-1.499-.277-.479-.113-1.09,.364-1.366,.479-.279,1.091-.113,1.366,.364,.179,.31,.511,.501,.867,.501h2.268c.552,0,1-.448,1-1,0-.378-.271-.698-.644-.76l-3.041-.507c-1.342-.223-2.315-1.373-2.315-2.733,0-1.654,1.346-3,3-3v-1c0-.552,.447-1,1-1s1,.448,1,1v1h.268c1.067,0,2.063,.575,2.598,1.5,.277,.478,.113,1.089-.364,1.366-.48,.277-1.091,.113-1.366-.365-.179-.309-.511-.5-.867-.5h-2.268c-.552,0-1,.449-1,1,0,.378,.271,.698,.644,.76l3.041,.507c1.342,.223,2.315,1.373,2.315,2.733Z"></path>
                        </svg>
                      </div>
                      <Field
                        name="maxPrice"
                        className="outline-none bg-transparent px-2 py-[6px] w-full"
                        placeholder="Max Price"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-col py-3 flex w-full">
                  <div
                    className="text-neutral-500 text-[13px] py-2 px-2"
                    id="checkbox-group"
                  >
                    FEATURES
                  </div>
                  <div
                    className="w-full flex-row flex px-4"
                    role="group"
                    aria-labelledby="checkbox-group"
                  >
                    <div className="w-1/2 flex-col flex">
                      <label>
                        <input
                          type="checkbox"
                          checked={values.features_climatizer}
                          onChange={(e) =>
                            setFieldValue(
                              "features_climatizer",
                              e.target.checked
                            )
                          }
                          className="mr-2"
                        />
                        AC & Heating
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={values.features_dishwasher}
                          onChange={(e) =>
                            setFieldValue(
                              "features_dishwasher",
                              e.target.checked
                            )
                          }
                          className="mr-2"
                        />
                        Dishwasher
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={values.features_balcony}
                          onChange={(e) =>
                            setFieldValue("features_balcony", e.target.checked)
                          }
                          className="mr-2"
                        />
                        Balcony
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={values.features_fitness}
                          onChange={(e) =>
                            setFieldValue("features_fitness", e.target.checked)
                          }
                          className="mr-2"
                        />
                        Fitness Center
                      </label>
                    </div>
                    <div className="w-1/2 flex-col flex">
                      <label>
                        <input
                          type="checkbox"
                          checked={values.features_office}
                          onChange={(e) =>
                            setFieldValue("features_office", e.target.checked)
                          }
                          className="mr-2"
                        />
                        Office
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={values.features_shop}
                          onChange={(e) =>
                            setFieldValue("features_shop", e.target.checked)
                          }
                          className="mr-2"
                        />
                        Shop
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={values.features_basement}
                          onChange={(e) =>
                            setFieldValue("features_basement", e.target.checked)
                          }
                          className="mr-2"
                        />
                        Basement
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full py-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-center py-2 bg-lime-600 text-white rounded-[9px] shadow text-[19px] font-medium"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="w-fit h-[90%] bg-white ml-2 my-10 shadow p-3 rounded-[9px] box-border overflow-auto">
          <form
            onSubmit={handleSearch}
            className="flex-row flex w-full rounded-[9px] bg-stone-100 px-2 py-2"
          >
            <button className="w-6 h-6" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Isolation_Mode"
                data-name="Isolation Mode"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                className="m-auto h-full"
                fill="#475569"
              >
                <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
              </svg>
            </button>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="bg-transparent placeholder:text-gray-500 my-auto h-full px-3 outline-none placeholder:text-left text-left"
            />
          </form>
          <div className="w-full">
            {listings.map((listing) => (
              <div key={listing._id} className="p-1 ">
                <div
                  className="p-2  border-b cursor-pointer"
                  onClick={() => navigate("/properties/" + listing._id)}
                >
                  <img
                    alt=""
                    src={listing.displayImages?.[0].url}
                    className="rounded-[9px] w-[323px] h-full object-cover"
                  />
                  <div className="pt-2 flex-row flex w-full">
                    <div className="font-semibold text-[16px]">
                      {listing.street}
                    </div>
                    <div className="text-lime-700 font-semibold text-[17px] mr-0 ml-auto">
                      ${new Intl.NumberFormat().format(listing.price)}
                    </div>
                  </div>
                  <div className="ml-0 mr-auto w-full text-left">
                    <div className="text-neutral-600 text-[14px]">
                      {listing.city} - {listing.country}
                    </div>
                  </div>
                </div>
                <div className="w-full flex-row flex py-1">
                  <div className="flex-row flex">
                    <div className="rounded-full bg-lime-100 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Isolation_Mode"
                        data-name="Isolation Mode"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        className="m-auto h-full"
                        fill="#3f6212"
                      >
                        <path d="M2,14H24v8H22V19H2v3H0V2H2Zm3.5-2A2.5,2.5,0,1,0,3,9.5,2.5,2.5,0,0,0,5.5,12ZM21,6H12A3,3,0,0,0,9,9v3H24V9A3,3,0,0,0,21,6Z"></path>
                      </svg>
                    </div>
                    <div className="text-lime-900 text-[14px] my-auto px-2">
                      {listing.bedrooms} bedroom
                    </div>
                  </div>
                  <div className="flex-row flex">
                    <div className="rounded-full bg-lime-100 p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Isolation_Mode"
                        data-name="Isolation Mode"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        className="m-auto h-full"
                        fill="#3f6212"
                      >
                        <path d="M19,1.171v-.168c-.002-.552,.444-1.001,.997-1.003h.003c.551,0,.999,.446,1,.997v.171c0,.647,.251,1.254,.708,1.71,.833,.833,1.292,1.942,1.292,3.121,0,.552-.448,1-1,1s-1-.448-1-1c0-.635-.258-1.258-.707-1.707-.834-.834-1.293-1.943-1.293-3.122Zm-2,5.521v.308c0,.552,.448,1,1,1s1-.448,1-1v-.308c0-1.179-.459-2.288-1.292-3.121-.457-.457-.708-1.063-.708-1.708v-.864c0-.552-.448-1-1-1s-1,.448-1,1v.864c0,1.179,.459,2.287,1.293,3.122,.456,.456,.707,1.062,.707,1.707Zm7,8.308v4c0,2.045-1.237,3.802-3,4.576V15c0-.552-.448-1-1-1s-1,.448-1,1v9h-3V15c0-.552-.448-1-1-1s-1,.448-1,1v9h-4V15c0-.552-.448-1-1-1s-1,.448-1,1v9h-3V15c0-.552-.448-1-1-1s-1,.448-1,1v8.576c-1.763-.774-3-2.531-3-4.576v-4c0-1.304,.837-2.403,2-2.816v-1.684c0-1.93,1.57-3.5,3.5-3.5h.5c1.578,0,3.061,.772,3.966,2.065l2.054,2.935h8.979c1.657,0,3,1.343,3,3ZM5.5,5c1.381,0,2.5-1.119,2.5-2.5S6.881,0,5.5,0,3,1.119,3,2.5s1.119,2.5,2.5,2.5Z"></path>
                      </svg>
                    </div>
                    <div className="text-lime-900 text-[14px] my-auto px-2">
                      {listing.bathrooms} bathroom
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {renderMap && (
        <MapContainer
          center={markerPos || center}
          zoom={11}
          scrollWheelZoom={true}
          className="w-full h-full"
          onClick={(e) => setCenter([e.latlng.lat, e.latlng.lng])}
        >
          <Markers />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      )}
    </div>
  );
};
