import React, { useState } from "react";
import "./login.css";

interface Props {
  setUserValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  setUserAuthState: React.Dispatch<React.SetStateAction<string>>;
}

function Login({ setUserValidated, setUserID, setUserAuthState }: Props) {
  let username = "";
  let password = "";
  const [errorMessage, setErrorMessage] = useState("");

  const updateUsername = (event: React.FormEvent<HTMLInputElement>) => {
    username = event.currentTarget.value;
  };
  const updatePassword = (event: React.FormEvent<HTMLInputElement>) => {
    password = event.currentTarget.value;
  };

  const checkUserToken = async () => {
    // const uri = import.meta.env.VITE_SERVER + "/user/cookielogin";
    const uri = "http://" + window.location.hostname + ":5000/user/cookielogin";
    fetch(uri, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data !== "NO") {
          setUserID(data);
          setUserValidated(true);
        }
      });
  };
  checkUserToken();

  const handleLogin = (
    userData: {
      name: String;
      email: String;
      password: String;
    },
    submitButton: HTMLInputElement
  ) => {
    // const uri = import.meta.env.VITE_SERVER + "/user/login";
    const uri = "http://" + window.location.hostname + ":5000/user/login";
    fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          setErrorMessage("server error");
          submitButton.blur();
          submitButton.setAttribute("value", "Submit");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.isValid == true) {
          setUserID(data.userID);
          setUserValidated(true);
        } else {
          setErrorMessage("cant find user");
          submitButton.blur();
          submitButton.setAttribute("value", "Submit");
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };
  const validateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitButton = event.currentTarget.getElementsByTagName("input")[2];
    submitButton.setAttribute("value", `Loading...`);
    const userData = {
      name: "",
      email: "",
      password: password,
    };
    if (username.includes("@")) {
      userData.email = username;
    } else {
      userData.name = username;
    }
    handleLogin(userData, submitButton);
  };
  return (
    <div id="user-root">
      <h1 style={{ position: "fixed", top: "0" }}>21BCP270</h1>
      <div id="user-container">
        <div id="user-header">LOGIN FORM</div>
        <form id="user-form" onSubmit={validateUser}>
          <div>
            <label>Name or Email: </label>
            <input
              maxLength={25}
              minLength={3}
              required
              onInput={updateUsername}
              pattern="[a-zA-Z0-9_]+"
              title="Only Alphabets, numbers and underscore allowed"
            ></input>
          </div>
          <div>
            <label>Password: </label>
            <input
              required
              minLength={3}
              maxLength={8}
              type="password"
              onInput={updatePassword}
            ></input>
          </div>
          <div>
            <input type="submit" value={"Submit"}></input>
            {errorMessage}
            <div
              style={{
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              New User?{" "}
              <button
                onClick={() => {
                  setUserAuthState("signin");
                }}
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
