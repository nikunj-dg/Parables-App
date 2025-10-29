import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

interface Parable {
    id: number;
    title: string;
    content: string;
    author?: string;
    tags?: string;
}

const ParableDisplay = () => {
    const location = useLocation();
    // ? helps safely access nested properties that may be undefined or null 
    const parable = location.state?.parable;
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const user_token = sessionStorage.getItem("user_token");
        
        setIsLoggedIn(!!user_token);
    }, []);

    const handleEditClick = (e: React.MouseEvent, parable: Parable) => {
        e.stopPropagation;
        navigate(`/editparable/${parable.id}`,
            { state: {parable} }
        )
    }

    const handleDeleteClick = (e: React.MouseEvent, parable: Parable) => {
        e.stopPropagation;

        const user_token = sessionStorage.getItem("user_token");

        if (!user_token) navigate('/login');

        // DELETE logic
        fetch(`http://127.0.0.1:8000/parables/${parable.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user_token}`
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to delete parable");
            }
            // Some APIs return JSON after DELETE, others return 204 No Content
            return res.status === 204 ? null : res.json();
        })
        .then((data) => {
            console.log("Parable deleted successfully", data);

            navigate("/");
        })
        .catch((err) => console.error("Error deleting parable:", err));
    }

    // Return error component 
    if (!parable) return <p className="text-center mt-10">parable not found</p>;

    return (
        <div className="flex flex-col items-center justify-between p-8 bg-gradient-to-b from-gray-100 to-white">
            <Link to="/" className="self-start mb-6">
                <span className="text-xl ">
                    <IoMdArrowRoundBack />
                </span>
            </Link>

            <div className="max-w-2xl bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    {parable.title}
                </h2>

                <p className="text-gray-600 text-center italic mb-6">
                    By {parable.author}
                </p>
                
                <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-serif text-lg">
                    {parable.content}
                </pre>
            </div>

            {isLoggedIn && (
                <div className="mt-7">
                    <span onClick={(e) => handleEditClick(e, parable)} className="text-lg mb-3 rounded-lg px-4 py-2 mx-3 shadow-md hover:shadow-xl transition duration-200">
                        Edit
                    </span>
                    <span onClick={(e) => handleDeleteClick(e, parable)} className="text-lg mb-3 rounded-lg px-4 py-2 mx-3 bg-red-300 shadow-md hover:shadow-xl transition duration-200">
                        Delete
                    </span>
                </div>
            )}
        </div>
    );
}

export default ParableDisplay;