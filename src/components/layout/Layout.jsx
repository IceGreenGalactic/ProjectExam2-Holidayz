import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./breadCrumbs";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container mt-3">
        <Breadcrumbs />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
