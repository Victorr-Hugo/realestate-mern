import React from "react";
import { useNavigate } from "react-router-dom";
import MapView from "../components/Map/MapView";
import { useBrokers } from "../context/brokerContext";

export const CreatePage = () => {
  const { brokerId } = useBrokers();

  if (!brokerId) window.location.replace("/login");

  return (
    <div className="w-full h-full">
      <MapView />
    </div>
  );
};
