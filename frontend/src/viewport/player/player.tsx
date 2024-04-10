import React from "react";
import "./player.css";
import { PlayerInfo } from "../interface";

interface Props {
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  playerInfo: PlayerInfo;
}

function Player({ setPlayerInfo, playerInfo }: Props) {
  return (
    <div id="player-root">
      <div id="player-song-name">
        <img
          style={{
            width: "35px",
            height: "35px",
            margin: "0px 10px",
            borderRadius: "5px",
          }}
          src={playerInfo.src.replace("mp3", "jpg")}
        ></img>
        {playerInfo.name}
      </div>
      <div id="player-song-controls">
        <span><img width={"25px"} src="icons/rewind.svg" alt="" /></span>
        <span><img width={"25px"} src="icons/play-pause.svg" alt="" /></span>
        <span><img src="icons/" alt="" /></span>
      </div>
    </div>
  );
}

export default Player;
