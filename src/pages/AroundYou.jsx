import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader, SongCard } from "../components";
import { useGetAroundYouSongsQuery } from "../redux/services/shazamCore";
import { useSelector } from "react-redux";

const CountryTracks = () => {
  const [country, setCountry] = useState("");
  const [isLoadingContry, setIsLoadingCountry] = useState(true);
  const { isLoading: isLoadingCountryCode, data: aroundYouSongs } =
    useGetAroundYouSongsQuery(country);
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_I5RCCseO3SXUsaVUJ0a8DI9dX7FbO"
      )
      .then((res) => {
        setCountry(res.data.location.country);
      })
      .catch((error) => console.log(error))
      .finally(setIsLoadingCountry(false));
  }, []);
  if (isLoadingContry || isLoadingCountryCode)
    return <Loader title="loading around you songs" />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-3">
        {aroundYouSongs?.tracks?.map((song, i) => (
          <SongCard
            activeSong={activeSong}
            song={song}
            isPlaying={isPlaying}
            i={i}
            data={aroundYouSongs}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
