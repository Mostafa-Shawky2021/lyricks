import { useSearchSongsQuery } from "../redux/services/shazamCore";
import { Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Search = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { searchTerm } = useParams();

  const { data, isFetching } = useSearchSongsQuery(searchTerm);

  if (isFetching) return <Loader title="Loading songs..." />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="text-white text-2xl  font-bold">Search {searchTerm}</h2>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-3">
        {data?.tracks?.hits.map((song, i) => (
          <SongCard
            key={song?.track.key}
            song={song?.track}
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

export default Search;
