import React, { useEffect, useState } from "react";
import "./search.css";
import { PlayerController, PlayerInfo, SongInfo } from "../interface";

interface Props {
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  songResults: SongInfo[];
  playerController: PlayerController;
  mobileViewportState: string;
}

function Search({
  setPlayerInfo,
  songResults,
  playerController,
  mobileViewportState,
}: Props) {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [shownResults, setShownResults] = useState<SongInfo[]>([]);
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchKeyWord(e.currentTarget.value);
  };

  const handlePlay = (index: number) => {
    setPlayerInfo((prev) => ({
      ...prev,
      name: shownResults[index].name + "",
      src: shownResults[index].src + "",
      isPlaying: true,
    }));
  };

  useEffect(() => {
    setShownResults(
      songResults.filter(
        (song) =>
          song.name.toLowerCase().match(searchKeyWord.toLowerCase()) ||
          song.artist.toLowerCase().match(searchKeyWord.toLowerCase())
      )
    );
  }, [searchKeyWord]);
  return (
    <div
      id="search-root"
      className={mobileViewportState === "search" ? "" : "mobile-hide"}
    >
      <div id="search-bar-root">
        <input id="search-bar" onChange={handleInput}></input>
        <input id="search-button" type="submit" value={"search"}></input>
      </div>
      <div id="search-results-root">
        {shownResults.map((element, index) => (
          <div
            key={index}
            onClick={() => {
              handlePlay(index);
            }}
            id="search-results"
          >
            <img
              src={`${element.src
                .replace("mp3", "jpg")
                .replace("localhost", window.location.hostname)}`}
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
