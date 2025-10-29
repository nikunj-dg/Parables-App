import { FaSearch } from "react-icons/fa";
import { useState } from "react";

interface SearchProps {
  onSearchChange: (value: string) => void;
}

const Search = ({ onSearchChange }: SearchProps) => {
  const [searchVal, setSearchVal] = useState("");
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl m-3">Parables</h1>
        
        <div className="p-3 w-100 bg-gray-100 rounded-full mb-5 flex items-center">
            <FaSearch />
            <input onChange={(e) => {
              setSearchVal(e.target.value);
              onSearchChange(e.target.value);
            }} className="bg-gray-100 flex-1 mx-3 outline-none" placeholder="Search" value={searchVal}></input>
        </div>
    </div>
  );
};

export default Search;
