import React from "react";
// Outlet is used to render the content of the nested routes
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Main = () => {
  return (
    <div>
      {/*Rendering the Header , Footer Component and Outlet */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
