import { genres } from "../assets/constants";
import { useGetTopChartsByGenreQuery } from "../redux/services/shazamCore";
import { Loader, SongCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
const Discover = () => {
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, isFetching } = useGetTopChartsByGenreQuery(genreListId);
  const dispatch = useDispatch();

  const genre = genres.find(({ value }) => value == genreListId);

  if (isFetching) return <Loader title="Loading songs..." />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="text-white text-2xl  font-bold">
          Discover {genre?.title || "Pop"}
        </h2>
        <select
          onChange={(event) => {
            dispatch(selectGenreListId(event.target.value));
          }}
          className="bg-black  text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option
              key={genre.value}
              value={genre.value}
              selected={genre.value === genreListId}
            >
              {genre.title}
            </option>
          ))}
        </select>
      </div>

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

export default Discover;
