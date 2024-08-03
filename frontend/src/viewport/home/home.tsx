import React, { useMemo } from "react";
import "./home.css";
import { PlayerInfo, SongInfo } from "../interface";

interface Props {
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  songResults: SongInfo[];
  mobileViewportState: string;
}

function Home({ setPlayerInfo, songResults, mobileViewportState }: Props) {
  //songresults are divided into bundles of fixed size
  const bundles: SongInfo[][] = useMemo(() => {
    console.info("Recalculating Bundles");
    return createBundles(songResults);
  }, [songResults]);
  const handlePlay = (bundleIndex: number, SongIndex: number) => {
    setPlayerInfo((prev) => ({
      ...prev,
      name: bundles[bundleIndex][SongIndex].name + "",
      src: bundles[bundleIndex][SongIndex].src + "",
      isPlaying: true,
    }));
  };
  return (
    <div
      id="home-root"
      className={mobileViewportState === "home" ? "" : "mobile-hide"}
    >
      <div id="hero-root">
        <div id="hero-image-section"></div>
      </div>
      <div id="home-body-root">
        {bundles.map((bundle, bindex) => (
          <div key={bindex} className="home-playlist">
            {bundle.map((song, sindex) => (
              <div
                onClick={() => handlePlay(bindex, sindex)}
                className="home-playlist-song"
                key={sindex}
                style={{
                  backgroundImage: `url("${song.src
                    .replace("mp3", "jpg")
                    .replace("localhost", window.location.hostname)}")`,
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
  for (let i = 0; i < songResults.length - 50; i += 5) {
    bundles.push(songResults.slice(i, i + 5));
  }
  return bundles;
}

export default Home;
