import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (term.trim().length > 3) navigate(`/search/${term}`);
    else alert("Please enter Search term");
  };

  return (
    <form
      className="p-1 text-gray-400 focus-within:text-gray-600 "
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row justify-start items-center max-w-[400px]">
        <button>
          <FiSearch className="text-white m-0" />
        </button>
        <input
          onChange={(event) => setTerm(event.target.value)}
          name="search-field"
          id="search-field"
          type="search"
          placeholder="Search"
          className="border-none bg-transparent flex-1 outline-none placeholder-gray-500 text-white p-4"
          value={term}
        />
      </div>
    </form>
  );
};

export default Searchbar;
