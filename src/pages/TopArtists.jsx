import { ArtistCard, Loader } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
const TopArtists = () => {
  const { data: topArtist, isLoading: isLoadingTopArtist } =
    useGetTopChartsQuery();

  {
    if (isLoadingTopArtist) return <Loader title="Loading top artists ..." />;
    return (
      <div className="flex flex-col">
        <h2 className="text-white text-2xl  mt-3 mb-5">Top Artists</h2>
        <div className="flex flex-wrap sm:justify-start justify-center gap-4">
          {topArtist?.tracks?.map((artist) => (
            <ArtistCard artist={artist} key={artist?.artists[0].alias} />
          ))}
        </div>
      </div>
    );
  }
};

export default TopArtists;
