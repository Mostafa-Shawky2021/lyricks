import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetRelatedSongQuery,
  useGetSongDetailsQuery,
} from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isLoading: isLoadingSongDetails } =
    useGetSongDetailsQuery(songid);
  const { data: relatedSongs, isLoading: isLoadingRelatedSongs } =
    useGetRelatedSongQuery(songid);

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = (data, i, song) => {
    dispatch(setActiveSong({ data, i, song }));
  };

  if (isLoadingRelatedSongs || isLoadingSongDetails)
    return <Loader title="Loading Song Details" />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-5 mt-5">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      </div>
      <div>
        {songData?.sections[1]?.type === "LYRICS" ? (
          songData.sections[1].text.map((line, i) => (
            <p className="text-gray-400 my-1" key={i}>
              {line}
            </p>
          ))
        ) : (
          <p className="text-gray-400">Sorry no lyrics found</p>
        )}
      </div>
      <RelatedSongs
        activeSong={activeSong}
        data={relatedSongs?.tracks}
        isPlaying={isPlaying}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    </div>
  );
};

export default SongDetails;
