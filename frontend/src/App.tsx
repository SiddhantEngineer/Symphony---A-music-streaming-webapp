import React from "react";
import "./App.css";
import { useState } from "react";
import Viewport from "./viewport/viewport";
import Login from "./login/login";
// import Signin from "./signin/singin";

function App() {
  const [userValidated, setUserValidated] = useState(true);
  const [userID, setUserID] = useState("");
  const checkSession = () => {};
  return (
    <>
      {userValidated ? (
        <Viewport
          setUserValidated={setUserValidated}
          userInfo={{ name: "sid" }}
        ></Viewport>
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
