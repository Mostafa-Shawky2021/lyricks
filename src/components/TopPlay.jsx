import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import { playPause, setActiveSong } from "../redux/features/playerSlice";

import "swiper/css";
import "swiper/css/free-mode";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import Loader from "./Loader";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}) => {
  return (
    <div className="flex w-full items-center hover:bg-[#4c426e] py-2 px-3 rounded-lg cursor-pointer">
      <h3 className="font-bold text-sm text-white mr-3">{i + 1} </h3>
      <div className="flex flex-1 flex-row  items-center">
        <img
          className="w-14 h-14 rounded-xl"
          src={song?.images.coverart}
          alt={song?.title}
        />
        <div className="flex flex-col mx-3 flex-1">
          <Link to={`/songs/${song.key}`}>
            <p className="text-white font-bold">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className="text-sm text-gray-500 mt-1">
              {decodeURI(song.artists[0].alias)}
            </p>
          </Link>
        </div>
        <div>
          <PlayPause
            isPlaying={isPlaying}
            song={song}
            handlePause={handlePause}
            handlePlay={handlePlay}
            activeSong={activeSong}
          />
        </div>
      </div>
    </div>
  );
};

const TopPlay = () => {
  const { data } = useGetTopChartsQuery();
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  const dispatch = useDispatch();

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = (data, i, song) => {
    dispatch(setActiveSong({ data, i, song }));
  };

  const topPlays = data?.tracks?.slice(0, 5);

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 mt-3 flex-1 xl:w-[380px] flex flex-col"
    >
      <div className="flex flex-col w-full">
        <div className=" flex align-center justify-between w-full">
          <h2 className="text-white font-bold mb-2">Top charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300">See more..</p>
          </Link>
        </div>

        <div className="flex flex-col gap-1 mt-3 xl:h-[210px] overflow-y-auto hide-scrollbar  min-h-[120px]">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              handlePlay={() => handlePlay(data, i, song)}
              handlePause={handlePause}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-col">
          <div className="flex items-center justify-between mb-2 mt-2">
            <h2 className="text-white font-bold">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300">See more..</p>
            </Link>
          </div>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song) => (
            <SwiperSlide
              key={song.key}
              style={{ width: "25%" }}
              className="shadow-lg  rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  className="rounded-full w-full object-cover"
                  src={song?.images.background}
                  alt="name"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
