import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

interface NavProps {
  isLogged: boolean;
  setLoggedIn: (value: boolean) => void;
}

const Navbar = ({ isLogged, setLoggedIn }: NavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const user_token = sessionStorage.getItem("user_token");

    fetch("http://127.0.0.1:8000/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user_token}`
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to logout");
        }

        return res.json();
    })
    .then((data) => {
        console.log("Logged out successfully:", data);

        sessionStorage.removeItem("user_token");
        setLoggedIn(false);
        setIsMenuOpen(false);

        navigate("/");
    })
    .catch((err) => console.error("Error loggin out:", err));
  };

  return (
    <nav className="flex justify-between bg-gray-300 text-gray-600">
        <span className="text-lg pt-4 px-10">
          <Link to="/">Home</Link>
        </span>

        <span className="p-5 pt-6 px-10" onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)}>
          <span className="relative text-xl"><FaUser /></span>
        
          {isMenuOpen && (
            <div className="absolute right-0 mt-5 w-40 text-center bg-white rounded-lg shadow-lg border border-gray-100">
              { !isLogged ? (
                <div className="flex flex-col text-gray-700">
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    LogIn/ SignUp
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </span>
    </nav>
  );
};

export default Navbar;
