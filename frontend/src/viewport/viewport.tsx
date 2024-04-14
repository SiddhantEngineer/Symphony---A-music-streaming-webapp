import React, { useEffect, useState } from "react";
import "./viewport.css";
import Sidebar from "./sidebar/sidebar";
import Home from "./home/home";
import Search from "./search/search";
import Player from "./player/player";
import { SongInfo, PlayerInfo } from "./interface";

const player = document.createElement("audio");
document.body.appendChild(player);

function Viewport() {
  const [songResults, setSongResults] = useState<SongInfo[]>([]);
  useEffect(() => {
    fetch("http://" + window.location.hostname + ":5000/admin/songList", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("ERROR");
        }
      })
      .then((data) => {
        setSongResults(data);
        console.log(songResults);
      });
  }, []);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    songIndex: -1,
    isPlaying: false,
    src: "",
    name: "",
  });
  useEffect(() => {
    playSong(player, playerInfo, setPlayerInfo);
  }, [playerInfo]);
  return (
    <div id="viewport-root">
      <Sidebar></Sidebar>
      <Home songResults={songResults} setPlayerInfo={setPlayerInfo}></Home>
      <Search songResults={songResults} setPlayerInfo={setPlayerInfo}></Search>
      <Player
        player={player}
        setPlayerInfo={setPlayerInfo}
        playerInfo={playerInfo}
      ></Player>
    </div>
  );
}

function playSong(
  player: HTMLAudioElement,
  playerInfo: PlayerInfo,
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo>>
) {
  if (playerInfo.isPlaying) {
    console.log("HE");
    player.pause();
    player.src = playerInfo.src.replace("localhost", window.location.hostname);
    player.play();
    return;
  }
  if (playerInfo.src) {
    console.log(playerInfo.src);
    player.src = playerInfo.src;
    player.play();
  }
}

export default Viewport;
