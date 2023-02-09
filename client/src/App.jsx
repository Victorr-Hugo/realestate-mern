import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { HomePage, CreatePage, ListingsPage, ListingPage } from "./pages/index";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="h-full">
        <div className="h-full flex-col flex relative min-w-full">
          <Header />
          <div className="w-full h-full pt-[66px] ">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/properties" element={<ListingsPage />} />
              <Route path="/properties/:id" element={<ListingPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
