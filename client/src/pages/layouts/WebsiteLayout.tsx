import React from "react";
import Header from "../../components/Header";
import "../../styles/main.css";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

type Props = {};

const WebsiteLayout = (props: Props) => {
  return (
    <div className="content-wrapper font-Poppins max-w-screen-2xl text-sm mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
