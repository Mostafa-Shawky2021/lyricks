import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { Loader, SongCard } from "../components";
import { useSelector } from "react-redux";

const TopCharts = () => {
  const { data, isLoading } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col">
      <h2 className="text-white text-2xl font-bold ">Top Charts</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-3">
        {data?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
