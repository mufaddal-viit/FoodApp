// Layout.js
import React, { useState } from 'react';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";;

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* <Header/> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
