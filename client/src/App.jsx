import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import {
  HomePage,
  CreatePage,
  ListingsPage,
  ListingPage,
  Signin,
  MyBrokerPage,
  BlogPage,
  PostPage,
} from "./pages/index";
import "./App.css";
import { useBrokers } from "./context/brokerContext";
function App() {
  const { brokerId } = useBrokers();

  return (
    <div className="App">
      <div className="h-full">
        <div className="h-full flex-col flex relative min-w-full">
          <Header />
          <div className="w-full h-full pt-[66px] ">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/create"
                element={brokerId ? <CreatePage /> : <Signin />}
              />
              <Route path="/properties" element={<ListingsPage />} />
              <Route path="/properties/:id" element={<ListingPage />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/mybroker" element={<MyBrokerPage />} />
              <Route path="/tools" element={<BlogPage />} />
              <Route path="/blog/:id" element={<PostPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
