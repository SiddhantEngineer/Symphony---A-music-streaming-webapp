import React from "react";
import Player from "./player/player";
import Navbar from "./navbar/navbar";
import "./home.css";

interface Props {
  userID: String;
  setUserValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Home({ userID, setUserValidated }: Props) {
  const logOut = () => {
    fetch("http://" + window.location.hostname + ":5000/logout", {
      method: "GET",
      credentials: "include",
    }).then(() => {
      console.log("HELO");
      setUserValidated(false);
    });
  };
  return (
    <div id="home-root">
      <button onClick={logOut}>LOG OUT</button>
      <Player></Player>
      <Navbar></Navbar>
    </div>
  );
}

export default Home;
