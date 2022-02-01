import React from "react";
import Menu from "./Menu";
import "../style.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="p-5 mb-4 bg-light jumbotron">
      <div className="container-fluid  text-center py-5">
        <h2 className="display-5 fw-bold ">{title}</h2>
        <p className="fs-4">{description}</p>
      </div>
    </div>
    <div className={`${className} `}> {children} </div>
  </div>
);

export default Layout;
