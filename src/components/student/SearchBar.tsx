import { useState } from "react";
import searchIcon from "../../assets/search_icon.svg";
import { useNavigate } from "react-router";

type SearchBarProps = {
  data?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const handleOnSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/courses-list/${input}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <form
      onSubmit={handleOnSearch}
      className="max-w-xl w-full h-12 md:h-14 flex items-center bg-white border border-input rounded"
    >
      <img src={searchIcon} alt="Search Icon" className="md:w-auto w-10 px-3" />
      <input
        onChange={handleInputChange}
        value={input}
        type="text"
        placeholder="Search for courses"
        className="w-full h-full outline-none text-desc"
      />
      <button className="bg-surface rounded text-white px-7 md:px-10 py-2 md:py-3 mx-1">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
