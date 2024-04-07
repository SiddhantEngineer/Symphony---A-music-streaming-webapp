import React, { useState } from "react";
import Player from "./player/player";
import Navbar from "./navbar/navbar";
import "./viewport.css";
import Home from "./home/home";
import State from "./state";
import Profile from "./profile/profile";

interface Props {
  userInfo: {
    name: string;
  };
  setUserValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Viewport({ userInfo, setUserValidated }: Props) {
  // const logOut = () => {
  //   fetch("http://" + window.location.hostname + ":5000/logout", {
  //     method: "GET",
  //     credentials: "include",
  //   }).then(() => {
  //     console.log("HELO");
  //     setUserValidated(false);
  //   });
  // };
  const [state, setState] = useState<State>(State.HOME);
  const getViewport = () => {
    switch (state) {
      case State.HOME: {
        return <Home></Home>;
      }
      case State.PROFILE: {
        return <Profile></Profile>;
      }
    }
  };
  return (
    <div id="viewport-root">
      {getViewport()}
      <Player></Player>
      <Navbar state={state} setState={setState}></Navbar>
    </div>
  );
}

export default Viewport;
