import React from "react";
import "./navbar.css";
import State from "../state";
import Home from "../home/home";

interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

function Navbar({ state, setState }: Props) {
  return (
    <div id="navbar-root">
      {Object.values(State).map((value, index) => (
        <div
          key={index}
          onClick={() => setState(value)}
          className="navbar-element"
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export default Navbar;
