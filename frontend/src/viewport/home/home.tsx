import React, { useMemo } from "react";
import "./home.css";
import { PlayerInfo, SongInfo } from "../interface";

interface Props {
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  songResults: SongInfo[];
}

function Home({ setPlayerInfo, songResults }: Props) {
  console.log(songResults);
  const bundles: SongInfo[][] = useMemo(() => {
    return createBundles(songResults);
  }, [songResults]);
  return (
    <div id="home-root">
      <div id="hero-root">
        <div id="hero-image-section"></div>
      </div>
      <div id="home-body-root">
        {bundles.map((bundle) => (
          <div className="home-playlist">
            {bundle.map((song, index) => (
              <div
                className="home-playlist-song"
                key={index}
                style={{
                  backgroundImage: `url("${song.src.replace("mp3", "jpg")}")`,
                }}
              >
                <div>{song.name}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function createBundles(songResults: SongInfo[]) {
  const bundles: SongInfo[][] = [];
  for (let i = 0; i < songResults.length; i += 10) {
    bundles.push(songResults.slice(i, i + 9));
  }
  return bundles;
}

export default Home;
