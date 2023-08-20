import SongBar from "./SongBar";

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePlay,
  handlePause,
  artistId,
}) => {
  return (
    <div className="flex flex-col mt-4">
      <h3 className="font-bold text-white text-2xl">Related Songs:</h3>
      <div className="mt-6 flex flex-col">
        {!!data?.length ? (
          data?.map((song, i) => (
            <SongBar
              i={i}
              song={song}
              key={`${song.key}-${artistId}`}
              isPlaying={isPlaying}
              artistId={artistId}
              activeSong={activeSong}
              handlePlay={() => handlePlay(data, i, song)}
              handlePause={handlePause}
            />
          ))
        ) : (
          <p className="text-base text-gray-400">Sorry no related songs</p>
        )}
      </div>
    </div>
  );
};

export default RelatedSongs;
