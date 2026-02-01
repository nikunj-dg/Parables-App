import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Home from "../components/Home";
import ParableDisplay from "../components/ParableDisplay";
import AddParable from "../components/AddParable";
import EditParable from "../components/EditParable";
import Login from "../components/Login";
import ErrorModal from "../components/ErrorModal";

function App() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <ErrorModal />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parable/:id" element={<ParableDisplay />} />
          <Route path="/addparable" element={<AddParable />} />
          <Route path="/editparable/:id" element={<EditParable />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
