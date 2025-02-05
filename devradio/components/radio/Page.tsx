"use strict";

import { motion } from "framer-motion"; // Framer Motion
import Image from "next/image";
// import Link from 'next/link';
import { useState, useEffect } from "react";
// const RPC = require('discord-rpc');
import { Client } from "discord-rpc";

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


import { Button, For, HStack } from "@chakra-ui/react"
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@chakra-ui/react"

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
  citypop90s: ["/assets/radio/background/citypoplofi.gif"],
  citypop70s: ["/assets/radio/background/citypoplofi.gif"],
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
    name: "Lofi Girl Medieval Fantasy",
    url: "",
    tags: ["medievallofi"],
    alternates: [""], // 100% available so no need for alternates
    isVideo: true,
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
    url: "https://youtu.be/eEZF9iIv5XM",
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
  },
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
  const [stationSource, setStationSource] = useState(
    "https://www.youtube.com/watch?v=jfKfPfyJRdk"
  ); // Station URL
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [volumeValue, setVolumeValue] = useState(0.5);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const id = "1336281479713521755";

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
  const scopes = [
    "rpc",
    "rpc.api",
    "messages.read",
    "activities.write",
    "activities.read",
  ];

  const client = new Client({ transport: "ipc", scopes });
  client.login({ clientId: id }).catch(console.error);
  client.on("ready", () => {
    client.setActivity({
      details: "Listening some music on radio.",
      state: `🎶 Tuned in desktop app`,
      startTimestamp: new Date(),
      largeImageKey: "radio_big",
      largeImageText: "🎶 devscafe.org/radio",
      smallImageKey: "devscafe",
      smallImageText: "🎶 devscafe.org/radio",
      instance: false,
    });
  });

  function setStation(index: number) {
    const currentStation = station[index];

    const videoUrls = currentStation.isVideo
      ? [currentStation.url, ...currentStation.alternates.filter((alt) => alt)] // Combina URL principal e alternates válidos
      : [currentStation.url]; // Apenas o URL principal se não for vídeo

    const stationUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

    setStationSource(stationUrl);

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
      const prevIndexAdjusted =
        (prevIndex - 1 + station.length) % station.length;
      setStation(prevIndexAdjusted); // Atualizar a estação com o índice anterior
      return prevIndexAdjusted;
    });
  };

  const handleError = (e: React.SyntheticEvent) => {
    setIsOffline(true);
    if (isPlaying) {
      setTimeout(() => {
        handleNextStation();
        setIsOffline(false);
      }, 5000);
    }
    console.error("Err: " + e);
  };

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const volume = parseFloat(e.target.value) / 100;
    if (volume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    setVolumeValue(volume);
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "m":
          handleMuteToggle();
          break;
        case "ArrowRight":
          handleNextStation();
          break;
        case "ArrowLeft":
          handlePrevStation();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); 

  const BackgroundRender: React.FC<{
    children: React.ReactNode;
    currentBackground: string;
  }> = ({ children, currentBackground }) => {
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
        {children}
      </div>
    );
  };

  const StationAvatar: React.FC<{
    handlePlayPause: () => void;
    handleMuteToggle: () => void;
    isPlaying: boolean;
  }> = ({ handlePlayPause, handleMuteToggle, isPlaying }) => {
    return (
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
            height={250}
            width={250}
            className={`rounded-full shadow-lg 
                          h-40 w-40
                          lg:h-60 lg:w-60              
                          ${isMuted ? "filter blur-md" : ""}
                          ${isOffline ? "grayscale" : ""}
                          ${isPlaying ? "animate-spin-slow" : ""}
                      `}
            onClick={handlePlayPause}
          />
          {isOffline ? (
            <div className="absolute inset-20 flex items-center justify-start">
              <LuRadioTower size={60} className="text-red" />
            </div>
          ) : !isPlaying ? (
            <div className="absolute inset-20 flex items-center justify-start">
              <FaPause
                size={60}
                className="text-white"
                onClick={handlePlayPause}
              />
            </div>
          ) : (
            isMuted && (
              <div className="absolute inset-20 flex items-center justify-start">
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
    );
  };

  interface PlayerControlsProps {
    handlePrevStation: () => void;
    handlePlayPause: () => void;
    handleMuteToggle: () => void;
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNextStation: () => void;
    isPlaying: boolean;
    isMuted: boolean;
    volumeValue: number;
    station: { name: string; url: string; image: string }[];
    stationIndex: number;
  }

  const PlayerControls: React.FC<PlayerControlsProps> = ({
    handlePrevStation,
    handlePlayPause,
    handleMuteToggle,
    handleVolumeChange,
    handleNextStation,
    isPlaying,
    isMuted,
    volumeValue,
    station,
    stationIndex,
  }) => {
    return (
      <div
        className="
        flex flex-col justify-center align-center gap-4 
        bg-gray-800 p-2 m-4 rounded-lg w-full
        "
      >
        <div className="flex flex-col md:flex-row gap-2">
          <h1 className="md:flex-row text-2xl md:text-4xl font-jetbrains">
            {station[stationIndex].name}
          </h1>
        </div>
        <div className="flex gap-2 md:gap-6 justify-center md:justify-start bg-gray-500 p-2 rounded-lg md:bg-transparent">
          <button
            onClick={handlePrevStation}
            className="text-2xl font-jetbrains hidden md:flex"
          >
            <FiSkipBack size={20} />
          </button>
          <button onClick={handlePlayPause} className="text-2xl font-jetbrains">
            {isPlaying ? (
              <FaPause
                size={20}
                className="text-2xl lg:text-6xl font-jetbrains"
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
          <button>
            <FiExternalLink
              size={20}
              className="text-blue-500 hover:text-blue-700 cursor-pointer text-md md:text-3xl lg:text-6xl"
              onClick={() => window.open(station[stationIndex].url, "_blank")}
            />
          </button>
        </div>
      </div>
    );
  };


  // Drawer to add new stations
  // will pop up a drawer from bottom to add new stations
  // Add a new station to the list of stations and it will be saved in the local storage

  function addStation(bgpath: string, name: string, url: string) {
    let newStation = {
      name: name,
      url: url,
      alternates: [""], // Extra URLs for the same station (prevents unavailable station lo
      // Also used when the station is a video so it can be used to start an random video to not get the same video every time
      isVideo: false, // Used to determine if the station is a video true = video false = live stream
      tags: ["lofi"], // Tags to determine the background selected
      image: bgpath,
    };
    
    station.push(newStation);

    // Save the new station to the local storage
    localStorage.setItem("stations", JSON.stringify(station));
  }

  interface AddStationDrawerProps {
    trigger?: boolean;
  }

  const AddStationDrawer: React.FC<AddStationDrawerProps> = ({trigger = false}) => {
    return (
      <DrawerRoot placement={"bottom"} open={trigger}>
        <DrawerContent>
          <DrawerCloseTrigger>
            <button>Close</button>
          </DrawerCloseTrigger>
          <DrawerHeader>
            <DrawerTitle>Add a new station</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-4 items-center">
              <input
                type="text"
                placeholder="Station Name"
                className="bg-gray-800 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Station URL"
                className="bg-gray-800 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Station Image URL"
                className="bg-gray-800 rounded-lg p-2"
              />
              <button
                className="bg-gray-800 rounded-lg p-2"
                onClick={() => {
                  addStation("bgpath", "name", "url");
                }}
              >
                Add Station
              </button>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <button>Save</button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    );
  };


  interface SideStationsProps {}

  const SideStations: React.FC<SideStationsProps> = ({}) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          margin: "1px",
          backgroundColor: "rgb(0, 0, 0)",
          // Border radius 5px
          borderRadius: "10px",
        }}
      >
        {/* 
          List of stations on sidebar
          */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
            overflowY: "scroll",
            maxHeight: "90vh",
            padding: "5px",
            // Scrollbar on the left
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.5)",
            msScrollbarTrackColor: "rgba(0, 0, 0, 0.5)",
            msScrollbarFaceColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <h1
            className="
              text-4xl
              font-jetbrains
              fixed pb-4
              "
          >
            Stations
          </h1>

        {/* 
        Here has a button where user can add a new custom station to the list
        */}

          <div className="flex flex-col gap-4 items-center pt-14">
            <button
              className="bg-gray-800 rounded-lg
              transition duration-500 ease-in-out hover:bg-gray-700
              transform hover:scale-105
              bg-opacity-50
              "
              style={{
                width: "100%",
                minWidth: "200px",
                minHeight: "70px",
                padding: "6px",
              }}

              onClick={() => {
                setIsDrawerOpen(true);
              }}
            >
              Add a new station
            </button>
          </div>
          <div
            className="flex flex-col gap-4 items-start
            pt-14
            p-4
            "
          >
            {station.map((station, index) => (
              <div
                key={index}
                className="flex flex-row gap-4 items-center
              bg-gray-800 rounded-lg 
              transition duration-500 ease-in-out hover:bg-gray-700
              transform hover:scale-105
              bg-opacity-50
              "
                style={{
                  width: "100%",
                  minWidth: "200px",
                  minHeight: "70px",
                  padding: "6px",
                }}
              >
                <Image
                  src={station.image}
                  alt={station.name}
                  height={50}
                  width={50}
                  className="rounded-full shadow-lg h-11 w-11"
                />
                <button
                  onClick={() => {
                    setStationIndex(index);
                    setStation(index);
                  }}
                  className="text-xl font-jetbrains"
                >
                  {
                    // If overflow the name will be cut
                    station.name.length > 10
                      ? station.name.substring(0, 10) + "..."
                      : station.name
                  }
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <BackgroundRender currentBackground={currentBackground}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // Align between the two columns
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div>
          <div>
            <LofiRadio
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

          <StationAvatar
            handlePlayPause={handlePlayPause}
            handleMuteToggle={handleMuteToggle}
            isPlaying={isPlaying}
          />

          <PlayerControls
            handlePrevStation={handlePrevStation}
            handlePlayPause={handlePlayPause}
            handleMuteToggle={handleMuteToggle}
            handleVolumeChange={handleVolumeChange}
            handleNextStation={handleNextStation}
            isPlaying={isPlaying}
            isMuted={isMuted}
            volumeValue={volumeValue}
            station={station}
            stationIndex={stationIndex}
          />
        </div>
        <div>
          <SideStations />
        </div>
      </div>

        {/* esta div 
        deve estar fora do container para que o drawer possa ser renderizado sem interferir no layout
        */}
    </BackgroundRender>
  );
};

export default RadioPage;
