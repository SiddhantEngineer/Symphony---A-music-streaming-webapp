import React, { useEffect, useState } from "react";
import "./search.css";

interface Song {
  name: string;
  artist: string;
  src: string;
}

function Search() {
  useEffect(() => {
    fetch("http://localhost:5000/allSongs", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("ERROR");
        }
      })
      .then((data) => {
        setResults(data);
      });
  }, []);

  const [results, setResults] = useState<Song[]>([]);
  return (
    <div id="search-root">
      <div id="search-bar-root">
        <input id="search-bar"></input>
        <input id="search-button" type="submit" value={"search"}></input>
      </div>
      <div id="search-results-root">
        {results.map((element, index) => (
          <div key={index} id="search-results">
            <img
              src={`${element.src.replace("mp3", "jpg")}`}
              id="search-result-image"
            ></img>
            <div id="search-result-text">
              <span>{element.name}</span>
              <span style={{ fontSize: "10px", color: "grey" }}>
                {element.artist}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
