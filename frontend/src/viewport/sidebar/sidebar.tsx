import React, { useState } from "react";
import "./sidebar.css";

interface Props {
  setMobileViewportState: React.Dispatch<React.SetStateAction<string>>;
  mobileViewportState: string;
  setUserValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({
  setMobileViewportState,
  mobileViewportState,
  setUserValidated,
}: Props) {
  //for mobile devices -> opening sidebar when user clicks it
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () => {
    fetch("http://" + window.location.hostname + ":5000/user/logout", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        console.log("RESPONS ERROR");
        return;
      }
      console.log("CLEARING");
      setUserValidated(false);
    });
  };

  return (
    <div
      id="sidebar-root"
      onClick={handleOpen}
      className={isOpen ? "sidebar-open" : "sidebar-close"}
    >
      <div id="sidebar-header">Symphony</div>
      <div id="sidebar">
        <div
          onClick={() => setMobileViewportState("home")}
          className={`sidebar-element ${
            mobileViewportState === "home" ? "sidebar-element-selected" : ""
          }`}
        >
          Home
        </div>
        <div
          onClick={() => setMobileViewportState("search")}
          className={`sidebar-element sidebar-element-mobile ${
            mobileViewportState === "search" ? "sidebar-element-selected" : ""
          }`}
        >
          Search
        </div>
        <div className="sidebar-element" onClick={logOut}>
          LogOut
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
