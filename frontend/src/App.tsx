import React from "react";
import "./App.css";
import { useState } from "react";
import Viewport from "./viewport/viewport";
import Login from "./login/login";
// import Signin from "./signin/singin";

function App() {
  const [userValidated, setUserValidated] = useState(false);
  const [userID, setUserID] = useState("");
  console.log("IN APP");
  return (
    <>
      {userValidated ? (
        <Viewport setUserValidated={setUserValidated}></Viewport>
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
