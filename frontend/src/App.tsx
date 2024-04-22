import React from "react";
import "./App.css";
import { useState } from "react";
import Viewport from "./viewport/viewport";
import Login from "./user/login";
import Signin from "./user/signin";
// import Signin from "./signin/singin";

function App() {
  const [userValidated, setUserValidated] = useState(false);
  const [userID, setUserID] = useState("");
  const [userAuthState, setAuthUserState] = useState("login");
  console.log("IN APP");
  return (
    <>
      {userValidated ? (
        <Viewport setUserValidated={setUserValidated}></Viewport>
      ) : userAuthState === "login" ? (
        <Login
          setUserAuthState={setAuthUserState}
          setUserID={setUserID}
          setUserValidated={setUserValidated}
        ></Login>
      ) : (
        <Signin
          setUserAuthState={setAuthUserState}
          setUserID={setUserID}
          setUserValidated={setUserValidated}
        ></Signin>
      )}
    </>
  );
}

export default App;
