"use strict";

import { motion } from "framer-motion"; // Framer Motion
import Image from "next/image";
// import Link from 'next/link';
import { useState, useEffect } from "react";
// const RPC = require('discord-rpc');
import { Client } from 'discord-rpc';

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

// ICONS
import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  // FaPlayCircle,
} from "react-icons/fa";
import { LuRadioTower } from "react-icons/lu";
// Link to another page icon
import { FiExternalLink } from "react-icons/fi";
import { FiSkipForward } from "react-icons/fi";
import { FiSkipBack } from "react-icons/fi";

// Simple Pomodoro Clock Component
// For productivity while listening to music
interface PomodoroClockProps {
  handlePause: () => void;
}

const PomodoroClock: React.FC<PomodoroClockProps> = ({ handlePause }) => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pauseMusicOnBreak, setPauseMusicOnBreak] = useState(true);

  // Format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            setIsBreak((prevIsBreak) => !prevIsBreak); // Switch between work and break
            // handlePause(); // Pause the music when the timer runs out
            if (pauseMusicOnBreak) {
              handlePause();
              // Also stop the timer
              setIsRunning(false);
            }
            return isBreak ? 25 * 60 : 5 * 60; // Reset to work (25 mins) or break (5 mins)
            // handlePause(); // Pause the music when the timer runs out
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup on component unmount or state change
    }
  }, [isRunning, isBreak]);

  // Handlers
  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setTime(25 * 60); // Reset to 25 minutes
    setIsBreak(false);
  };

  return (
    <motion.div
      className="flex flex-col gap-4
        fixed bottom-0 right-0 p-4 m-4 rounded-lg shadow-lg
        "
      style={{ zIndex: 1000 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1
        className="
        text-xl
        lg:text-3xl
        font-jetbrains"
      >
        Pomodoro Clock
      </h1>
      <div className="flex gap-4 items-center">
        <button onClick={handleStartPause} className="text-2xl font-jetbrains">
          {isRunning ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
        <button onClick={handleReset} className="text-2xl font-jetbrains">
          Reset
        </button>
        <div className="flex gap-2 items-center aling-center">
          <input
            type="checkbox"
            checked={pauseMusicOnBreak}
            onChange={() => setPauseMusicOnBreak((prev) => !prev)}
          />
          <label>Pause music on break</label>
        </div>
      </div>
      <div className="text-2xl font-jetbrains">
        {formatTime(time)} {isBreak ? "Break" : "Work"}
      </div>
    </motion.div>
  );
};

/*
{
    "menuLabel": "Music",
    "bookmarks": [
        {
            "title": "lofi.cafe",
            "url": "https://lofi.cafe/",
            "type": "link",
            "shortcut": "Cmd+1"
        },
        {
            "title": "beats to relax/study to - lofi girl",
            "url": "https://www.youtube.com/watch?v=jfKfPfyJRdk",
            "type": "link",
            "shortcut": "Cmd+2"
        },
        {
            "title": "beats to sleep/chill to - lofi girl",
            "url": "https://www.youtube.com/watch?v=rUxyKA_-grg",
            "type": "link",
            "shortcut": "Cmd+3"
        },
        {
            "title": "synthwave radio - lofi girl",
            "url": "https://www.youtube.com/watch?v=4xDzrJKXOOY",
            "type": "link",
            "shortcut": "Cmd+4"
        },
        {
            "title": "lonelyboy",
            "url": "https://www.youtube.com/@lonelyboyxyz",
            "type": "link"
        },
        {
            "title": "lofi geek",
            "url": "https://www.youtube.com/channel/UCyD59CI7beJDU493glZpxgA",
            "type": "link"
        },
        {
            "title": "LOFI Galaxy",
            "url": "https://www.youtube.com/channel/UCgyqgNSc6XMv1Nidr-jDJeg",
            "type": "link"
        },
        {
            "title": "Lucid Rhythms",
            "url": "https://www.youtube.com/@LucidRhythms",
            "type": "link"
        },
        {
            "type": "separator"
        },
        {
            "title": "lofi ATC",
            "url": "https://www.lofiatc.com/",
            "type": "link"
        },
        {
            "title": "lofi ATC - DTW",
            "url": "https://www.lofiatc.com/?icao=KDTW",
            "type": "link",
            "shortcut": "Cmd+9"
        },
        {
            "type": "separator"
        },
        {
            "title": "Nature Relaxation",
            "type": "link",
            "url": "https://www.youtube.com/c/dhuting"
        },
        {
            "title": "Primal Earth",
            "type": "link",
            "url": "https://www.youtube.com/@primalearth8951"
        },
        {
            "title": "Cosmic Relaxation",
            "type": "link",
            "url": "https://www.youtube.com/watch?v=Y_plhk1FUQA"
        },
        {
            "type": "separator"
        },
        {
            "title": "RÜFÜS DU SOL Live from Joshua Tree",
            "type": "link",
            "url": "https://www.youtube.com/watch?v=Zy4KtD98S2c"
        },
        {
            "title": "Lane 8 - Sunrise Set - Grand Lake, CO",
            "type": "link",
            "url": "https://www.youtube.com/watch?v=n_LcVqqHSY8"
        },
        {
            "title": "Ambient Polyrhythms // Mandala ASMR Sounds",
            "url": "https://www.youtube.com/watch?v=Ns1QVFlmtII",
            "type": "link"
        }
    ]
}
*/
type Backgrounds = {
  [key: string]: string[];
};

const backgrounds: Backgrounds = {
  lofi: [
    // This are the tags that will be used to determine the background
    "/assets/radio/background/tokyo.gif",
    "/assets/radio/background/loficafe.gif",
    // "/assets/radio/background/pixeltrain.gif"
  ],
  synthwave: [
    "/assets/radio/background/synthwave.gif",
    "/assets/radio/background/loficafe.gif",
    "/assets/radio/background/cyberpunkcoffee.gif",
  ],
  metal: ["/assets/radio/background/doom.gif"],
  minecraft: ["/assets/radio/background/minecherry.gif"],
  medievallofi: ["/assets/radio/background/medievallofi.gif"],
  citypop90s: [
    "/assets/radio/background/citypoplofi.gif",
  ],
  citypop70s: [
    "/assets/radio/background/citypoplofi.gif",
  ],
};

const station = [
  {
    name: "Lo-fi girl",
    url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    alternates: [""], // Extra URLs for the same station (prevents unavailable station lo-fi girl no need for alternates)
                      // Also used when the station is a video so it can be used to start an random video to not get the same video every time
    isVideo: false, // Used to determine if the station is a video true = video false = live stream
    tags: ["lofi"], // Tags to determine the background selected
    image: "/assets/radio/avatar/lofigirl.png",
  },
  {
    name: "Synthwave radio",
    url: "https://www.youtube.com/watch?v=4xDzrJKXOOY",
    alternates: [""], // Also part of lo-fi girl so no need for alternates
    isVideo: false,
    tags: ["synthwave", "lofi"],
    image: "/assets/radio/avatar/lofigirl.png", // placeholder
  },
  {
    name: "Doom Music",
    url: "https://www.youtube.com/watch?v=JEuAYnjtJP0",
    tags: ["metal"],
    alternates: [""], // 100% available so no need for alternates
    isVideo: false,
    image: "/assets/radio/avatar/doommusic.png", // placeholder
  },
  {
    name: "MineCraft Chill Music",
    url: "https://www.youtube.com/watch?v=ANkxRGvl1VY",
    tags: ["minecraft"],
    alternates: [""], // 100% available so no need for alternates
    isVideo: true,
    image: "/assets/radio/avatar/minemuisic.png", // placeholder
  },
  {
    name: "MedievaLofi",
    url: "https://www.youtube.com/watch?v=nDFO6_XCTsc",
    tags: ["medievallofi"],
    alternates: [""], // 100% available so no need for alternates
    isVideo: false,
    image: "/assets/radio/avatar/medievallofi.jpg", // placeholder
  },
  // {
  //   name: "Beats to sleep/chill",
  //   url: "https://www.youtube.com/watch?v=rUxyKA_-grg",
  //   tags: ["lofi"],
  //   image: "/assets/radio/avatar/lofigirl.png", // placeholder
  // },
  {
    name: "90s City Pop",
    url: "https://www.youtube.com/watch?v=zXHS92Nirfo",
    tags: ["citypop90s"],
    // https://youtu.be/r_wfUZVG1-o
    alternates: ["https://www.youtube.com/watch?v=rThoOgLws_c"],
    isVideo: true,
    image: "/assets/radio/avatar/animastudio.jpg", // placeholder
  },
  {
    name: "70s City Pop",
    url: "https://www.youtube.com/watch?v=wc_yZjn8JWs",
    tags: ["citypop70s"],
    alternates: [""], // 100% available so no need for alternates
    isVideo: false,
    image: "/assets/radio/avatar/animastudio.jpg", // placeholder
  }
  // {
  //     name: "Pokemon Lofi",
  //     url: "https://www.youtube.com/watch?v=6CjpgFOOtuI",
  //     tags: ["lofi"],
  //     image: "/assets/radio/avatar/lofigirl.png", // placeholder
  // },

  // {
  //     name: "Lonelyboy",
  //     url: "https://www.youtube.com/@lonelyboyxyz",
  //     image: "/assets/radio/avatar/lofigirl.png", // placeholder
  // },
  // {
  //     name: "Lofi geek",
  //     url: "https://www.youtube.com/watch?v=ma4TtvgyBQ4",
  //     image: "/assets/radio/avatar/lofigirl.png", // placeholder
  // },
  // {
  //     name: "LOFI Galaxy",
  //     url: "https://www.youtube.com/channel/UCgyqgNSc6XMv1Nidr-jDJeg",
  //     image: "/assets/radio/avatar/lofigirl.png", // placeholder
  // },
  // {
  //     name: "Lucid Rhythms",
  //     url: "https://www.youtube.com/@LucidRhythms",
  //     image: "/assets/radio/avatar/lofigirl.png", // placeholder
  // },
];

interface LofiRadioProps {
  // station: { name: string; url: string; image: string };
  stationSource: string;
  handlePlayPause: () => void;
  handleMuteToggle: () => void;
  handleError: (e: React.SyntheticEvent) => void;
  handlePlay: () => void;
  handlePause: () => void;
  handleEnd: () => void;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}

const LofiRadio: React.FC<LofiRadioProps> = ({
  stationSource,
  // handlePlayPause,
  // handleMuteToggle,
  handleError,
  handlePlay,
  handlePause,
  handleEnd,
  isPlaying,
  isMuted,
  volume,
}) => {
  return (
    <div className="hidden">
      <ReactPlayer
        // url={station.url}
        url={stationSource}
        playing={isPlaying}
        muted={isMuted}
        onError={handleError}
        controls={false}
        onPlay={handlePlay} // Explicitly sets isPlaying to true
        onPause={handlePause} // Explicitly sets isPlaying to false
        onEnd={handleEnd}
        volume={volume}
      />
    </div>
  );
};



const RadioPage = () => {
  const [stationIndex, setStationIndex] = useState(0);
  const [stationSource, setStationSource] = useState("https://www.youtube.com/watch?v=jfKfPfyJRdk"); // Station URL
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [volumeValue, setVolumeValue] = useState(0.5);
  const id = '1336281479713521755';

  // const [currentTag, setCurrentTag] = useState("lofi"); // Default tag
  const [currentBackground, setCurrentBackground] = useState(
    "/assets/radio/background/tokyo.gif"
  ); // Default background
  // let currentTag = "";
  // let randomBackground = "";

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };

  const handlePlay = () => {
    setIsPlaying(true); // Ensure state is explicitly set to true
  };

  const handlePause = () => {
    setIsPlaying(false); // Ensure state is explicitly set to false
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };


  // Discord RPC
  const scopes = ['rpc', 'rpc.api', 'messages.read', 'activities.write', 'activities.read'];

  const client = new Client({ transport: 'ipc', scopes });
  client.login({ clientId: id }).catch(console.error);
  client.on('ready', () => {
    client.setActivity({
      details: 'Listening some music on radio.',
      state: `🎶 Tuned in desktop app`,
      startTimestamp: new Date(),
      largeImageKey: 'radio_big',
      largeImageText: '🎶 devscafe.org/radio',
      smallImageKey: 'devscafe',
      smallImageText: '🎶 devscafe.org/radio',
      instance: false,
    });
  });


  function setStation(index: number) {
    const currentStation = station[index];
  
    // Criar um array de URLs apenas para vídeos
    const videoUrls = currentStation.isVideo
      ? [currentStation.url, ...currentStation.alternates.filter((alt) => alt)] // Combina URL principal e alternates válidos
      : [currentStation.url]; // Apenas o URL principal se não for vídeo
  
    // Escolher aleatoriamente uma URL do array (sempre haverá pelo menos uma)
    const stationUrl =
      videoUrls[Math.floor(Math.random() * videoUrls.length)];
  
    // Atualizar a fonte da estação
    setStationSource(stationUrl);
  
    // Atualizar tag e background
    const currentTag = currentStation.tags[0];
    const randomBackground =
      backgrounds[currentTag][
        Math.floor(Math.random() * backgrounds[currentTag].length)
      ];
    
    setCurrentBackground(randomBackground);
  }
  
  
  const handleNextStation = () => {
    setStationIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % station.length;
      setStation(nextIndex); // Atualizar a estação com o novo índice
      return nextIndex;
    });
  };
  
  const handlePrevStation = () => {
    setStationIndex((prevIndex) => {
      const prevIndexAdjusted = (prevIndex - 1 + station.length) % station.length;
      setStation(prevIndexAdjusted); // Atualizar a estação com o índice anterior
      return prevIndexAdjusted;
    });
  };


  const handleError = (e: React.SyntheticEvent) => {
    // toaster.create({
    //     title: "Esta estação está offline",
    //     description: "Aparentemente a rádio está offline, pulando para a próxima estação...",
    //     duration: 5000,
    //     type: "error",
    // });

    setIsOffline(true);
    // Skip to the next station but only if the player is playing
    // Toast notification
    

    if (isPlaying) {
      //Wait a few seconds before changing the station
      setTimeout(() => {
        handleNextStation();
        setIsOffline(false);
      }, 5000);
    }
    console.error("Err: " + e);
  };

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    // setVolumeValue(parseFloat(e.target.value) / 100);
    // If the volume is 0, mute the player
    const volume = parseFloat(e.target.value) / 100;
    if (volume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    setVolumeValue(volume);
  }

  return (
    <div
      style={{
        // backgroundImage: `url(${randomBackground})`, // Pick a random background based on the current station tags
        backgroundImage: `url(${currentBackground})`, // Pick a random background based on the current station tags
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
      }}
      className="flex flex-col justify-center align-center w-full h-full px-6"
    >
      <div>
        <LofiRadio
          // station={station[stationIndex]}
          stationSource={stationSource}
          handlePlayPause={handlePlayPause}
          handleMuteToggle={handleMuteToggle}
          handleError={handleError}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleEnd={handleEnd}
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volumeValue}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "100px",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <motion.div
          className="rounded-full z-index-10 relative"
          layoutId="radio-image"
        >
          <Image
            src={station[stationIndex].image}
            alt={station[stationIndex].name}
            height={300}
            width={300}
            className={`
                            rounded-full
                            shadow-lg
                            h-60 w-60
                            lg:h-96 lg:w-96
                            ${isMuted ? "filter blur-md" : ""}
                            ${isOffline ? "grayscale" : ""}
                            ${isPlaying ? "animate-spin-slow" : ""}
                        `}
            onClick={handlePlayPause}
          />
          {isOffline ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LuRadioTower size={60} className="text-red" />
            </div>
          ) : !isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaPause
                size={60}
                className="text-white"
                onClick={handlePlayPause}
              />
            </div>
          ) : (
            isMuted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <FaVolumeMute
                  size={60}
                  className="text-white"
                  onClick={handleMuteToggle}
                />
              </div>
            )
          )}
        </motion.div>
      </div>
      <div
        className="flex flex-col justify-center align-center gap-4 
      bg-gray-800 md:bg-transparent
          p-2
      m-4 rounded-lg
      "
      >
        <div
          className="flex flex-col
        md:flex-row
        gap-2"
        >
          <h1
            className="
          md:flex-row
          text-4xl
          md:text-6xl
          font-jetbrains"
          >
            {station[stationIndex].name}
          </h1>
          <FiExternalLink
            size={55}
            className="
                        text-blue-500
                        hover:text-blue-700
                        cursor-pointer
                        text-md
                        md:text-3xl
                        lg:text-6xl
                        "
            onClick={() => window.open(station[stationIndex].url, "_blank")}
          />
        </div>
        <div
          className="flex 
        gap-2
        md:gap-6
        justify-center
        md:justify-start
        bg-gray-500
        p-2
        rounded-lg
        md:bg-transparent
        "
        >
          <button
            onClick={handlePrevStation}
            className="text-2xl font-jetbrains
            hidden
            md:flex
            "
          >
            <FiSkipBack size={20} />
          </button>
          <button onClick={handlePlayPause} className="text-2xl font-jetbrains">
            {isPlaying ? (
              <FaPause
                size={20}
                className="text-2xl 
            lg:text-6xl
            font-jetbrains"
              />
            ) : (
              <FaPlay size={20} />
            )}
          </button>
          <button
            onClick={handleMuteToggle}
            className="text-2xl font-jetbrains"
          >
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </button>

          <div className="flex gap-1">
            <input
              type="range"
              min={0}
              max={100}
              value={volumeValue * 100}
              onChange={handleVolumeChange}
            />
          </div>
          <button
            onClick={handleNextStation}
            className="text-2xl font-jetbrains"
          >
            <FiSkipForward size={20} />
          </button>
        </div>
        <div
          className="gap-6
        hidden
        lg:flex
        "
        >
          <PomodoroClock handlePause={handlePause} />
        </div>
      </div>
      {/* <Toaster /> */}
    </div>
  );
};

export default RadioPage;