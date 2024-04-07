import React from "react";
import "./App.css";
import { useState } from "react";
import Viewport from "./viewport/viewport";
import Login from "./login/login";
// import Signin from "./signin/singin";

interface SongInfo {
  name: string;
  src: string;
  artist: string;
}

function App() {
  const [userValidated, setUserValidated] = useState(true);
  const [userID, setUserID] = useState("");
  const [songInfo, setSongInfo] = useState<SongInfo>({
    name: "",
    src: "",
    artist: "",
  });
  return (
    <>
      {userValidated ? (
        <Viewport></Viewport>
      ) : (
        <Login
          setUserID={setUserID}
          setUserValidated={setUserValidated}
        ></Login>
      )}
    </>
  );
}

export default App;
