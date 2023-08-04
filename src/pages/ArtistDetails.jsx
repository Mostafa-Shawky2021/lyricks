import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails } =
    useGetArtistDetailsQuery(artistId);
  const { data: artistTopSongs, isLoading: isLoadingTopSongs } =
    useGetArtistTopSongsQuery(artistId);

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = (data, i, song) => {
    dispatch(setActiveSong({ data, i, song }));
  };

  if (isFetchingArtistDetails || isLoadingTopSongs)
    return <Loader title="Loading Song Details" />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.data} />
      <div className="mt-3">
        <RelatedSongs
          data={artistTopSongs?.data}
          isPlaying={isPlaying}
          handlePause={handlePause}
          handlePlay={handlePlay}
          artistId={artistId}
        />
      </div>
    </div>
  );
};

export default ArtistDetails;
