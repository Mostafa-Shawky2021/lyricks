import { Link } from "react-router-dom";

const ArtistCard = ({ artist }) => {
  return (
    <div className="w-[220px] rounded-lg flex-col p-4 bg-white/5 backdrop-blur-sm animate-slideup">
      <img src={artist?.images?.coverart} alt="artist-img" />
      <h3 className="mt-5 text-white text-base">
        <Link to={`/artists/${artist.artists[0].adamid}`} className="truncate">
          {artist.artists[0].alias}
        </Link>
      </h3>
    </div>
  );
};

export default ArtistCard;
