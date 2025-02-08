"use strict";

import { motion } from "framer-motion"; // Framer Motion
import Image from "next/image";
import { useState, useEffect } from "react";
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
} from "react-icons/fa";
import { LuRadioTower } from "react-icons/lu";
import { FiExternalLink } from "react-icons/fi";
import { FiSkipForward } from "react-icons/fi";
import { FiSkipBack } from "react-icons/fi";

// Extra icons
// import { FiSun } from "react-icons/fi";
// import { FiSunrise } from "react-icons/fi";
// import { FiSunset } from "react-icons/fi";
// import { FiMoon } from "react-icons/fi";
// import { sub } from "framer-motion/client";

type Backgrounds = {
  [key: string]: string[];
};

const backgrounds: Backgrounds = {
  lofi: [
    "/assets/radio/background/tokyo.gif",
    "/assets/radio/background/loficafe.gif",
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

// function getTimeOfDayIcon(timeOfDay: string) {
//   switch (timeOfDay) {
//     case "morning":
//       return <FiSunrise />;
//     case "afternoon":
//       return <FiSun />;
//     case "evening":
//       return <FiSunset />;
//     case "night":
//       return <FiMoon />;
//     default:
//       return <FiSun />;
//   }
// }

// function getSomeAdvice() {
//   const advice = [
//     "Drink some water!",
//     "Take a break and stretch!",
//     "Remember to breathe!",
//     "You're doing great!",
//     "Don't forget to eat!",
//     "Take a moment to relax!",
//     "You're awesome!",
//     "Take a break and walk around!",
//     "Stay hydrated!",
//     "Nice job!",
//     "Pause and look out the window!",
//     "Your hard work is paying off!",
//     "Keep going—you’ve got this!",
//     "Smiling is contagious—try it!",
//     "Be kind to yourself today.",
//     "Step outside for a moment of fresh air.",
//     "Turn your phone off for a bit.",
//     "Celebrate small wins!",
//     "It’s okay to take things slow.",
//     "Enjoy the moment—you're here for it.",
//     "Write down something you’re grateful for.",
//     "Progress, not perfection.",
//     "You’re braver than you believe.",
//     "Focus on what makes you happy.",
//     "Take a deep breath in… and out.",
//     "Treat yourself to a little break.",
//     "It’s okay to rest—you deserve it.",
//     "Listen to your favorite track again.",
//     "Small steps lead to big changes.",
//     "Take time to care for your mind.",
//     "Make today a good one.",
//     "Your energy is inspiring.",
//     "Light a candle or turn on some cozy lighting.",
//     "Stay curious—it’s a superpower.",
//     "Send someone you love a quick text.",
//     "Give yourself permission to relax.",
//     "Don’t overthink—just enjoy the vibe.",
//     "Dance like no one’s watching!",
//     "Take a few minutes to doodle or journal.",
//     "You’re stronger than you think.",
//     "Try some deep breathing for 30 seconds.",
//     "Appreciate the little things today.",
//     "Let the music carry your worries away.",
//     "Good vibes are coming your way.",
//     "Every moment is a fresh start.",
//     "Be proud of how far you’ve come.",
//     "Put on a cozy sweater or blanket.",
//     "It’s okay to make mistakes—keep learning.",
//     "Your vibe is immaculate.",
//     "Let your creativity flow.",
//     "Take time to organize your thoughts.",
//     "Trust the process—it’s worth it.",
//     "Sometimes less is more. Simplify today.",
//     "Fuel your body with something healthy.",
//     "Your future self is cheering you on.",
//     "Smile—it looks good on you!",
//     "Be present in the moment.",
//     "Every day is a chance to grow.",
//     "Keep your chin up—you’re amazing!"
//   ];

//   return advice[Math.floor(Math.random() * advice.length)];
// }

// 'https://openlibrary.org/
// Daily book recommendation
// function getBookRecommendation() {
//   let genres = [
//     "https://openlibrary.org/subjects/fiction.json",
//     "https://openlibrary.org/subjects/nonfiction.json",
//     "https://openlibrary.org/subjects/fantasy.json",
//     "https://openlibrary.org/subjects/mystery.json",
//     "https://openlibrary.org/subjects/romance.json",
//     "https://openlibrary.org/subjects/science_fiction.json",
//     "https://openlibrary.org/subjects/horror.json",
//     "https://openlibrary.org/subjects/history.json",
//   ]

//   let book = {
//     title: "",
//     subject: [""],
//     authors: [{ name: "" }],
//     first_publish_year: 0,
//     cover_id: 0,
//   };

//   fetch(genres[Math.floor(Math.random() * genres.length)])
//     .then((response) => response.json())
//     .then((data) => {
//       book = data.works[Math.floor(Math.random() * data.works.length)];
//     });

//   return book;
// }
// function calculateTimeOfDay() {
//   // Use date time
//   const time = new Date();
//   const hours = time.getHours();

//   // Determine the time of day
//   if (hours >= 6 && hours < 12) {
//     return "morning";
//   } else if (hours >= 12 && hours < 18) {
//     return "afternoon";
//   } else if (hours >= 18 && hours < 24) {
//     return "evening";
//   } else {
//     return "night";
//   }
// }

const RadioPage = () => {
  const [stationIndex, setStationIndex] = useState(0);
  const [stationSource, setStationSource] = useState(
    "https://www.youtube.com/watch?v=jfKfPfyJRdk"
  ); // Station URL
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [volumeValue, setVolumeValue] = useState(0.5);
  // const [advice, setAdvice] = useState("");

  // const [currentTime, setCurrentTime] = useState("00:00");

  // const [dailyBook, setDailyBook] = useState({
  //   title: "",
  //   subject: [""],
  //   authors: [{ name: "" }],
  //   first_publish_year: 0,
  //   cover_id: 0,
  // });

  const [station, setStationdata] = useState([
    {
      name: "",
      url: "",
      tags: [""],
      alternates: [""],
      isVideo: false,
      image: "",
    }
  ]);

  // Get daily book recommendation

  useEffect(() => {
    fetch("/assets/radio/data/stations.json")
      .then((res) => res.json())
      .then((data) => {
        setStationdata(data);
      });
  }, []);

  // // Update the current time every second
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const date = new Date();
  //     const hours = date.getHours();
  //     const minutes = date.getMinutes();
  //     setCurrentTime(
  //       `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`
  //     );
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const id = "1336281479713521755";
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

  const [currentBackground, setCurrentBackground] = useState(
    "/assets/radio/background/tokyo.gif"
  ); // Default background

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

    // setAdvice("🌟 " + getSomeAdvice());

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


  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface SideStationsProps extends Record<string, never> {}

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
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
            overflowY: "scroll",
            maxHeight: "90vh",
            padding: "5px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.5)",
            msScrollbarTrackColor: "rgba(0, 0, 0, 0.5)",
            msScrollbarFaceColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <div className="flex flex-col gap-4 items-start p-4">
            {station.map((station, index) => (
              <div
                key={index}
                className="flex flex-row gap-4 items-center
                bg-gray-800 rounded-lg 
                transition duration-500 ease-in-out hover:bg-gray-700
                transform hover:scale-105
                bg-opacity-50"
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

  const Extras = () => {
    return (
      <div className="flex flex-col gap-4 items-center m-4 w-full
      aling-start
      ">
        {/* <div className="flex flex-row gap-4 items-center bg-gray-800 p-4 rounded-lg w-full 
        justify-start
        ">
          <div className="flex flex-row gap-2 align-items-center justify-items-center">
            <h1 className="text-2xl font-jetbrains text-start">
              {currentTime}
            </h1>
            <h1 className="text-3xl font-jetbrains text-start">
              {getTimeOfDayIcon(calculateTimeOfDay())}
            </h1>
            <h1 className="text-md font-jetbrains text-start align-content-center">
              {advice}
            </h1>
          </div>
        </div> */}
      </div>
    );
  };

  return (
    <BackgroundRender currentBackground={currentBackground}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div> 
          <h1 className="text-2xl font-jetbrains text-center h-48">
            {/* <span className="text-3xl font-jetbrains bg-black p-2">Dev&apos;s Radio📻</span> */}
          </h1>
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

          <Extras />
        </div>
        <div>
          <SideStations />
        </div>
      </div>
    </BackgroundRender>
  );
};

export default RadioPage;