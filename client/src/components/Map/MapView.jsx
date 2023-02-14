import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getAddress, searchForLocation } from "../../api/Map";
import L from "leaflet";
import { useListings } from "../../context/listingContext";

import bathroom_icon from "../../resources/bathroom-icon.png";
import beedroom_icon from "../../resources/bedroom-icon.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapView = () => {
  const { createListing } = useListings();
  const [center, setCenter] = useState([45.9544512, -73.6128404, 8.63]);
  const [markerPos, setMarkerPos] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [renderMap, setRenderMap] = useState(false);
  const [showMultipleImages, setShowMultipleImages] = useState(false);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);
  const [imagePreview4, setImagePreview4] = useState(null);
  const [imagePreview5, setImagePreview5] = useState(null);
  const [imagePreview6, setImagePreview6] = useState(null);
  const [listing, setListing] = useState({
    name: "",
    country: "",
    neighbourhood: "",
    city: "",
    street: "",
    county: "",
    bedrooms: "",
    bathrooms: "",
    year_build: "",
    description: "",
    latitude: "",
    longitude: "",
    price: "",
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
    display_image_1: null,
    display_image_2: null,
    display_image_3: null,
    display_image_4: null,
    display_image_5: null,
    display_image_6: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setRenderMap(false);
    setTimeout(() => setRenderMap(true), 0);
  }, [center]);

  useEffect(() => {
    (async () => {
      if (markerPos) {
        const res = await getAddress(markerPos?.[0], markerPos?.[1]);
        setListing({
          name: res.display_name,
          country: res.address?.country,
          neighbourhood: res.address?.neighbourhood || res.address?.suburb,
          street: res.address?.road || res.address?.street,
          city: res.address?.city,
          county: res.address?.county,
          latitude: res.lat,
          longitude: res.lon,
        });
        console.log(res);
      }
    })();
  }, [markerPos]);

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
    return markerPos ? (
      <Marker key={markerPos[0]} position={markerPos} interactive={false}>
        <Popup>This marker shows where your listing is</Popup>
      </Marker>
    ) : null;
  };

  const handleDisplayMultiple = (e) => {
    setShowMultipleImages(true);
    setImagePreview1(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="w-full h-full relative max-w-full">
      <div
        className="absolute p-3 w-1/3 rounded-[9px] max-h-[80%] overflow-auto bg-white shadow left-10 z-[9999] top-20"
        id="create-listing"
      >
        <div className="text-[17px] font-medium text-left py-3 px-4 leading-[1.3333] text-[#050505]">
          Create Listing
        </div>
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
            placeholder="Search adress or city"
            className="bg-transparent placeholder:text-gray-500 my-auto h-full px-3 outline-none placeholder:text-left text-left"
          />
        </form>
        <div className="w-full h-full flex-col flex">
          <Formik
            initialValues={listing}
            enableReinitialize
            onSubmit={async (values, actions) => {
              await createListing(values);
              actions.resetForm();
              actions.setSubmitting(false);
              navigate("/");
            }}
          >
            {({ setFieldValue, isSubmitting, handleSubmit, values }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex-col flex text-left py-2"
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
                        name="name"
                        placeholder="Location"
                        className="my-1 py-1  px-4 outline-none mr-2 w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-neutral-500 text-[13px] py-2 px-2 pt-4">
                  DESCRIPTION
                </div>
                <Field
                  name="description"
                  placeholder="Description"
                  className="my-1 rounded-[9px] border pl-5 py-2 px-4 outline-none mr-2 w-full"
                />
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
                        name="bathrooms"
                        className="outline-none bg-transparent px-2 py-[6px] w-full"
                        placeholder="Bathroom number"
                      />
                    </div>
                    <div className="border rounded-[9px] w-1/2 ml-3 flex-row flex">
                      <img
                        alt=""
                        src={beedroom_icon}
                        className="w-6 h-6 m-auto mx-1"
                      />
                      <Field
                        name="bedrooms"
                        className="outline-none bg-transparent px-2 py-[6px] w-full"
                        placeholder="Bedroom number"
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
                    <div className="border rounded-[9px] w-full mr-3">
                      <Field
                        name="price"
                        className="outline-none bg-transparent px-4 py-[6px] w-full"
                        placeholder="Price"
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
                <div className="w-full">
                  {showMultipleImages ? (
                    <div className="w-full flex-row flex overflow-auto box-border">
                      {imagePreview1 ? (
                        <div className="rounded-[9px] mr-2 w-20 h-20 cursor-pointer">
                          <label
                            htmlFor="dropzone_image_1"
                            className="w-full h-full cursor-pointer"
                          >
                            <img
                              alt=""
                              src={imagePreview1}
                              className="w-full rounded-[9px] cursor-pointer hover:opacity-75 block h-full min-h-[80px] min-w-[80px] object-cover"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_1",
                                  e.target.files[0]
                                )
                              }
                            />

                            <input
                              className="hidden"
                              id="dropzone_image_1"
                              type="file"
                              name="display_image_1"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_1",
                                  e.target.files[0]
                                ) && handleDisplayMultiple(e)
                              }
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="p-4 rounded-[9px] border-dashed border-[3px] mr-2 w-20 h-20 bg-neutral-100 cursor-pointer hover:bg-neutral-50">
                          <label
                            htmlFor="dropzone_image_1"
                            className="w-full h-full cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="Bold"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="#525252"
                              className="m-auto h-full"
                            >
                              <path d="M19.5,0H4.5A4.505,4.505,0,0,0,0,4.5v15A4.505,4.505,0,0,0,4.5,24h15A4.505,4.505,0,0,0,24,19.5V4.5A4.505,4.505,0,0,0,19.5,0ZM4.5,3h15A1.5,1.5,0,0,1,21,4.5v15a1.492,1.492,0,0,1-.44,1.06l-8.732-8.732a4,4,0,0,0-5.656,0L3,15V4.5A1.5,1.5,0,0,1,4.5,3Z"></path>
                              <circle cx="15.5" cy="7.5" r="2.5"></circle>
                            </svg>
                            <input
                              className="hidden"
                              id="dropzone_image_1"
                              type="file"
                              name="display_image_1"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_1",
                                  e.target.files[0]
                                )
                              }
                            />
                          </label>
                        </div>
                      )}
                      {imagePreview2 ? (
                        <div className="rounded-[9px] mr-2 w-20 h-20 cursor-pointer">
                          <label
                            htmlFor="dropzone_image_1"
                            className="w-full h-full cursor-pointer"
                          >
                            <img
                              alt=""
                              src={imagePreview2}
                              className="w-full rounded-[9px] cursor-pointer hover:opacity-75 block h-full min-h-[80px] min-w-[80px] object-cover"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_2",
                                  e.target.files[0]
                                )
                              }
                            />

                            <input
                              className="hidden"
                              id="dropzone_image_1"
                              type="file"
                              name="display_image_2"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_2",
                                  e.target.files[0]
                                ) &&
                                setImagePreview2(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="p-4 rounded-[9px] border-dashed border-[3px] mr-2 w-20 h-20 bg-neutral-100 cursor-pointer hover:bg-neutral-50">
                          <label
                            htmlFor="dropzone_image_2"
                            className="w-full h-full cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="Bold"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="#525252"
                              className="m-auto h-full"
                            >
                              <path d="M19.5,0H4.5A4.505,4.505,0,0,0,0,4.5v15A4.505,4.505,0,0,0,4.5,24h15A4.505,4.505,0,0,0,24,19.5V4.5A4.505,4.505,0,0,0,19.5,0ZM4.5,3h15A1.5,1.5,0,0,1,21,4.5v15a1.492,1.492,0,0,1-.44,1.06l-8.732-8.732a4,4,0,0,0-5.656,0L3,15V4.5A1.5,1.5,0,0,1,4.5,3Z"></path>
                              <circle cx="15.5" cy="7.5" r="2.5"></circle>
                            </svg>
                            <input
                              className="hidden"
                              id="dropzone_image_2"
                              type="file"
                              name="display_image_2"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_2",
                                  e.target.files[0]
                                ) &&
                                setImagePreview2(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                          </label>
                        </div>
                      )}
                      {imagePreview3 ? (
                        <div className="rounded-[9px] mr-2 w-20 h-20 cursor-pointer">
                          <label
                            htmlFor="dropzone_image_3"
                            className="w-full h-full cursor-pointer"
                          >
                            <img
                              alt=""
                              src={imagePreview3}
                              className="w-full rounded-[9px] cursor-pointer hover:opacity-75 block h-full min-h-[80px] min-w-[80px] object-cover"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_3",
                                  e.target.files[0]
                                )
                              }
                            />

                            <input
                              className="hidden"
                              id="dropzone_image_3"
                              type="file"
                              name="display_image_3"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_3",
                                  e.target.files[0]
                                ) &&
                                setImagePreview3(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="p-4 rounded-[9px] border-dashed border-[3px] mr-2 w-20 h-20 bg-neutral-100 cursor-pointer hover:bg-neutral-50">
                          <label
                            htmlFor="dropzone_image_3"
                            className="w-full h-full cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="Bold"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="#525252"
                              className="m-auto h-full"
                            >
                              <path d="M19.5,0H4.5A4.505,4.505,0,0,0,0,4.5v15A4.505,4.505,0,0,0,4.5,24h15A4.505,4.505,0,0,0,24,19.5V4.5A4.505,4.505,0,0,0,19.5,0ZM4.5,3h15A1.5,1.5,0,0,1,21,4.5v15a1.492,1.492,0,0,1-.44,1.06l-8.732-8.732a4,4,0,0,0-5.656,0L3,15V4.5A1.5,1.5,0,0,1,4.5,3Z"></path>
                              <circle cx="15.5" cy="7.5" r="2.5"></circle>
                            </svg>
                            <input
                              className="hidden"
                              id="dropzone_image_3"
                              type="file"
                              name="display_image_3"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_3",
                                  e.target.files[0]
                                ) &&
                                setImagePreview3(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                          </label>
                        </div>
                      )}
                      {imagePreview4 ? (
                        <div className="rounded-[9px] mr-2 w-20 h-20 cursor-pointer">
                          <label
                            htmlFor="dropzone_image_4"
                            className="w-full h-full cursor-pointer"
                          >
                            <img
                              alt=""
                              src={imagePreview4}
                              className="w-full rounded-[9px] cursor-pointer hover:opacity-75 block h-full min-h-[80px] min-w-[80px] object-cover"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_4",
                                  e.target.files[0]
                                )
                              }
                            />

                            <input
                              className="hidden"
                              id="dropzone_image_4"
                              type="file"
                              name="display_image_4"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_4",
                                  e.target.files[0]
                                ) &&
                                setImagePreview4(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="p-4 rounded-[9px] border-dashed border-[3px] mr-2 w-20 h-20 bg-neutral-100 cursor-pointer hover:bg-neutral-50">
                          <label
                            htmlFor="dropzone_image_4"
                            className="w-full h-full cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="Bold"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="#525252"
                              className="m-auto h-full"
                            >
                              <path d="M19.5,0H4.5A4.505,4.505,0,0,0,0,4.5v15A4.505,4.505,0,0,0,4.5,24h15A4.505,4.505,0,0,0,24,19.5V4.5A4.505,4.505,0,0,0,19.5,0ZM4.5,3h15A1.5,1.5,0,0,1,21,4.5v15a1.492,1.492,0,0,1-.44,1.06l-8.732-8.732a4,4,0,0,0-5.656,0L3,15V4.5A1.5,1.5,0,0,1,4.5,3Z"></path>
                              <circle cx="15.5" cy="7.5" r="2.5"></circle>
                            </svg>
                            <input
                              className="hidden"
                              id="dropzone_image_4"
                              type="file"
                              name="display_image_4"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_4",
                                  e.target.files[0]
                                ) &&
                                setImagePreview4(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                          </label>
                        </div>
                      )}
                      {imagePreview5 ? (
                        <div className="rounded-[9px] mr-2 w-20 h-20 cursor-pointer">
                          <label
                            htmlFor="dropzone_image_5"
                            className="w-full h-full cursor-pointer"
                          >
                            <img
                              alt=""
                              src={imagePreview5}
                              className="w-full rounded-[9px] cursor-pointer hover:opacity-75 block h-full min-h-[80px] min-w-[80px] object-cover"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_5",
                                  e.target.files[0]
                                )
                              }
                            />

                            <input
                              className="hidden"
                              id="dropzone_image_5"
                              type="file"
                              name="display_image_5"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_5",
                                  e.target.files[0]
                                ) &&
                                setImagePreview5(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="p-4 rounded-[9px] border-dashed border-[3px] mr-2 w-20 h-20 bg-neutral-100 cursor-pointer hover:bg-neutral-50">
                          <label
                            htmlFor="dropzone_image_5"
                            className="w-full h-full cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="Bold"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="#525252"
                              className="m-auto h-full"
                            >
                              <path d="M19.5,0H4.5A4.505,4.505,0,0,0,0,4.5v15A4.505,4.505,0,0,0,4.5,24h15A4.505,4.505,0,0,0,24,19.5V4.5A4.505,4.505,0,0,0,19.5,0ZM4.5,3h15A1.5,1.5,0,0,1,21,4.5v15a1.492,1.492,0,0,1-.44,1.06l-8.732-8.732a4,4,0,0,0-5.656,0L3,15V4.5A1.5,1.5,0,0,1,4.5,3Z"></path>
                              <circle cx="15.5" cy="7.5" r="2.5"></circle>
                            </svg>
                            <input
                              className="hidden"
                              id="dropzone_image_5"
                              type="file"
                              name="display_image_5"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_5",
                                  e.target.files[0]
                                ) &&
                                setImagePreview5(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                          </label>
                        </div>
                      )}
                      {imagePreview6 ? (
                        <div className="rounded-[9px] mr-2 w-20 h-20 cursor-pointer">
                          <label
                            htmlFor="dropzone_image_6"
                            className="w-full h-full cursor-pointer"
                          >
                            <img
                              alt=""
                              src={imagePreview6}
                              className="w-full rounded-[9px] cursor-pointer hover:opacity-75 block h-full min-h-[80px] min-w-[80px] object-cover"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_6",
                                  e.target.files[0]
                                )
                              }
                            />

                            <input
                              className="hidden"
                              id="dropzone_image_6"
                              type="file"
                              name="display_image_6"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_6",
                                  e.target.files[0]
                                ) &&
                                setImagePreview6(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="p-4 rounded-[9px] border-dashed border-[3px] mr-2 w-20 h-20 bg-neutral-100 cursor-pointer hover:bg-neutral-50">
                          <label
                            htmlFor="dropzone_image_6"
                            className="w-full h-full cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="Bold"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="#525252"
                              className="m-auto h-full"
                            >
                              <path d="M19.5,0H4.5A4.505,4.505,0,0,0,0,4.5v15A4.505,4.505,0,0,0,4.5,24h15A4.505,4.505,0,0,0,24,19.5V4.5A4.505,4.505,0,0,0,19.5,0ZM4.5,3h15A1.5,1.5,0,0,1,21,4.5v15a1.492,1.492,0,0,1-.44,1.06l-8.732-8.732a4,4,0,0,0-5.656,0L3,15V4.5A1.5,1.5,0,0,1,4.5,3Z"></path>
                              <circle cx="15.5" cy="7.5" r="2.5"></circle>
                            </svg>
                            <input
                              className="hidden"
                              id="dropzone_image_6"
                              type="file"
                              name="display_image_6"
                              onChange={(e) =>
                                setFieldValue(
                                  "display_image_6",
                                  e.target.files[0]
                                ) &&
                                setImagePreview6(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-[9px] border-dashed border-[3px] w-20 h-20 bg-neutral-100 cursor-pointer hover:bg-neutral-50">
                      <label
                        htmlFor="dropzone_image_1"
                        className="w-full h-full cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          id="Bold"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="#525252"
                          className="m-auto h-full"
                        >
                          <path d="M19.5,0H4.5A4.505,4.505,0,0,0,0,4.5v15A4.505,4.505,0,0,0,4.5,24h15A4.505,4.505,0,0,0,24,19.5V4.5A4.505,4.505,0,0,0,19.5,0ZM4.5,3h15A1.5,1.5,0,0,1,21,4.5v15a1.492,1.492,0,0,1-.44,1.06l-8.732-8.732a4,4,0,0,0-5.656,0L3,15V4.5A1.5,1.5,0,0,1,4.5,3Z"></path>
                          <circle cx="15.5" cy="7.5" r="2.5"></circle>
                        </svg>
                        <input
                          className="hidden"
                          id="dropzone_image_1"
                          type="file"
                          name="display_image_1"
                          onChange={(e) =>
                            setFieldValue(
                              "display_image_1",
                              e.target.files[0]
                            ) && handleDisplayMultiple(e)
                          }
                        />
                      </label>
                    </div>
                  )}
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
      </div>
      {renderMap && (
        <MapContainer
          center={markerPos || center}
          zoom={8}
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

export default MapView;
