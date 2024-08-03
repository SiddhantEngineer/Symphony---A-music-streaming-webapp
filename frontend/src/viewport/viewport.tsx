import React, { useEffect, useMemo, useState } from "react";
import "./viewport.css";
import Sidebar from "./sidebar/sidebar";
import Home from "./home/home";
import Search from "./search/search";
import Player from "./player/player";
import { SongInfo, PlayerInfo, PlayerController } from "./interface";

interface Props {
  setUserValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

const player = document.createElement("audio");
document.body.appendChild(player);

function Viewport({ setUserValidated }: Props) {
  const [songResults, setSongResults] = useState<SongInfo[]>([]);
  const [loadSongs, setLoadSongs] = useState(false);
  const [mobileViewportState, setMobileViewportState] = useState("home");
  useMemo(() => {
    console.info("Loading Songs");
    fetch("http://" + window.location.hostname + ":5000/admin/songList", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("ERROR in Fetch");
        }
      })
      .then((data) => {
        setSongResults(data);
      });
  }, [loadSongs]);

  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    songIndex: -1,
    isPlaying: false,
    src: "",
    name: "",
    time: 0,
  });

  //listen for changes in playerinfo
  useEffect(() => {
    if (playerInfo.isPlaying) {
      playerController.play();
      return;
    }
    playerController.pause();
  }, [playerInfo]);

  //playercontroller for controlling media player
  const playerController: PlayerController = {
    next: () => {
      const nextSong = Math.floor(Math.random() * songResults.length);
      setPlayerInfo((prev) => ({
        ...prev,
        name: songResults[nextSong].name + "",
        src: songResults[nextSong].src + "",
        isPlaying: true,
        time: 0,
      }));
    },
    prev: () => {
      const nextSong = Math.floor(Math.random() * songResults.length);
      setPlayerInfo((prev) => ({
        ...prev,
        name: songResults[nextSong].name + "",
        src: songResults[nextSong].src + "",
        isPlaying: true,
        time: 0,
      }));
    },
    play: () => {
      console.log("PLAY");
      if (playerInfo.src) {
        player.pause();
        player.src = playerInfo.src.replace(
          "localhost",
          window.location.hostname
        );
        player.play();
        if (playerInfo.time > 0) {
          player.currentTime = playerInfo.time;
        }
      }
      return;
    },
    pause: () => {
      console.log("PAUSE");
      player.pause();
    },
  };

  return (
    <div id="viewport-root">
      <Sidebar
        setMobileViewportState={setMobileViewportState}
        mobileViewportState={mobileViewportState}
        setUserValidated={setUserValidated}
      ></Sidebar>
      <Home
        mobileViewportState={mobileViewportState}
        songResults={songResults}
        setPlayerInfo={setPlayerInfo}
      ></Home>
      <Search
        mobileViewportState={mobileViewportState}
        playerController={playerController}
        songResults={songResults}
        setPlayerInfo={setPlayerInfo}
      ></Search>
      <Player
        player={player}
        setPlayerInfo={setPlayerInfo}
        playerInfo={playerInfo}
        playerController={playerController}
      ></Player>
    </div>
  );
}

export default Viewport;
