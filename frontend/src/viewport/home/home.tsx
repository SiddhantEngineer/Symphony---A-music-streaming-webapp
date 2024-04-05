import React from "react";
import "./home.css";
import Hero from "./hero/hero";
import Content from "./content/content";

function Home() {
  return (
    <div id="home-root">
      <Hero></Hero>
      <Content></Content>
    </div>
  );
}

export default Home;
