import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

const ListingLocation = ({ listing }) => {
  console.log(listing);
  const latitude = listing.latitude;
  const longitude = listing.longitude;
  const [center, setCenter] = useState([latitude, longitude]);
  const [markerPos, setMarkerPos] = useState([latitude, longitude]);
  const [renderMap, setRenderMap] = useState(false);

  useEffect(() => {
    setRenderMap(false);
    setTimeout(() => setRenderMap(true), 0);
  }, [center]);

  const Markers = () => {
    useMapEvent({
      click(e) {
        setMarkerPos([latitude, longitude]);
      },
    });
    return markerPos ? (
      <Marker key={markerPos[0]} position={markerPos} interactive={false}>
        <Popup>This marker shows where your listing is</Popup>
      </Marker>
    ) : null;
  };

  return (
    <div className="w-full pt-10">
      <div className="w-full h-[321px] overflow-auto relative">
        <div className=" hidden md:block md:absolute left-0 h-full px-2 bg-slate-100 z-[9999]  overflow-auto ">
          {listing.features?.map((feature, e) => {
            if (feature !== null) {
              return (
                <div
                  key={e}
                  className="rounded-[9px] shadow my-2 bg-white py-4 px-3"
                >
                  {feature}
                </div>
              );
            }
          })}
        </div>
        {renderMap && (
          <MapContainer
            center={markerPos || center}
            zoom={16}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <Markers />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default ListingLocation;
