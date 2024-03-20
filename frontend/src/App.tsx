import React from "react";
import "./App.css";
import { useState } from "react";
import Home from "./home/home";
import Login from "./login/login";

function App() {
  const [userValidated, setUserValidated] = useState(false);
  const [userID, setUserID] = useState("");
  const checkSession = () => {};
  return (
    <>
      {userValidated ? (
        <Home setUserValidated={setUserValidated} userID={userID}></Home>
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
