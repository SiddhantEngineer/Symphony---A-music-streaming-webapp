import React from "react";
import "./content.css";

function Content() {
  const content = Array(15).fill(0);
  return (
    <div id="content-root">
      <div className="content-playlist">
        <div>{"<"}</div>
        <div className="content-songs">
          {content.map((element, index) => (
            <div key={index} className="content-element">
              {index}
            </div>
          ))}
        </div>
        <div>{">"}</div>
      </div>
    </div>
  );
}

export default Content;
