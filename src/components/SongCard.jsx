import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ activeSong, isPlaying, song, data, i }) => {
  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = () => {
    if (song?.hub?.actions) dispatch(setActiveSong({ data, i, song }));
    else alert("Problem with that song");
  };

  return (
    <div
      className="flex flex-col p-4  w-[220px] bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup
     rounded-lg cursor-pointer"
    >
      <div className="relative h-56 group">
        <div
          className={`absolute inset-0 justify-center 
          items-center bg-black bg-opacity-30 group-hover:flex ${
            activeSong?.title === song.title ? "flex" : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            song={song}
            handlePause={handlePause}
            handlePlay={handlePlay}
            activeSong={activeSong}
          />
        </div>
        <img
          src={song.images?.coverart}
          alt="song-img"
          className="w-full h-full"
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold mt-2 text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm mt-1 truncate text-gray-300 ">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
