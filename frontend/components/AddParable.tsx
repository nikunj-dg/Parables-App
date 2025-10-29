import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";

import ParableForm from "../components/ParableForm";

interface Parable {
    id: number;
    title: string;
    content: string;
    author?: string;
    tags?: string;
}

const AddParable = () => {
    const navigate = useNavigate();
    const [userToken, setUserToken] = useState("")

    useEffect(() => {
        const user_token = sessionStorage.getItem("user_token");

        if (!user_token) navigate('/login');
        else setUserToken(user_token);
    }, []);
    
    const handleAddParable = async (parable: Parable) => {
        console.log("Parable submitted:", parable);
        
        // POST logic
        fetch("http://127.0.0.1:8000/parables", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}` 
            },
            body: JSON.stringify(parable)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to add parable");
            }

            return res.json();
        })
        .then((data) => {
            console.log("Parable added successfully:", data);

            navigate(`/`);
        })
        .catch((err) => console.error("Error adding parable:", err));
    }

    const emptyParable = {
        id: -1,
        title: "",
        author: "",
        content: "",
        tags: "",
    }

    return (
        <div className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-gray-100 to-white">
            <Link to="/" className="self-start mb-6">
                <span className="text-xl ">
                    <IoMdArrowRoundBack />
                </span>
            </Link>

            <ParableForm onSubmit={handleAddParable} formTitle="Add a New Parable" parable={emptyParable}/> 
        </div>
    )
}

export default AddParable;