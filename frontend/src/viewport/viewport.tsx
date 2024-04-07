import React from "react";
import "./viewport.css";
import Sidebar from "./sidebar/sidebar";
import Home from "./home/home";
import Search from "./search/search";

function Viewport() {
  return (
    <div id="viewport-root">
      <Sidebar></Sidebar>
      <Home></Home>
      <Search></Search>
    </div>
  );
}

export default Viewport;
