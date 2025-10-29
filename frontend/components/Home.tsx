import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ParableCard from "../components/ParableCard";
import Search from "./Search";

import { FaPlus } from "react-icons/fa";

interface Parable {
  id: number;
  title: string;
  content: string;
  author?: string;
  tags?: string;
}

const Home = () => {
  const [parables, setParables] = useState<Parable[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const user_token = sessionStorage.getItem("user_token");
    setIsLoggedIn(!!user_token);

    fetch("http://127.0.0.1:8000/parables", {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json())
    .then((data) => setParables(data))
    .catch((err) => console.error("Error fetching parables:", err));
  }, []);

  const handleNewParableClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    navigate(`/addparable`);
  }

  const filteredParables = parables.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Search onSearchChange={setSearchTerm} />

    <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-100 to-white items-center">
      { isLoggedIn && ( 
        <div 
          onClick={handleNewParableClick} 
          className="text-xl bg-white rounded-lg p-4 m-4 shadow-md hover:shadow-xl transition duration-200 w-80 px-auto flex justify-center"
        >
          <FaPlus />
        </div>
      )}

      <div className="grid grid-cols-4 px-30">
        {filteredParables.map((p) => (
            <ParableCard parable={p} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
