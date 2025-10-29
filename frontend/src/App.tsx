import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Home from "../components/Home";
import ParableDisplay from "../components/ParableDisplay";
import AddParable from "../components/AddParable";
import EditParable from "../components/EditParable";
import Login from "../components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check user is logged in or not
  useEffect(() => {
    const user_token = sessionStorage.getItem("user_token");
    // Using !! equates to bool
    setIsLoggedIn(!!user_token);
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col">
        <Navbar isLogged={isLoggedIn} setLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parable/:id" element={<ParableDisplay />} />
          <Route path="/addparable" element={<AddParable />} />
          <Route path="/editparable/:id" element={<EditParable />} />
          <Route path="/login" element={<Login setLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
