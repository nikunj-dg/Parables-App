import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";

import ParableForm from "../components/ParableForm";

interface Parable {
    id: number;
    title: string;
    content: string;
    author?: string;
    tags?: string;
}

const EditParable = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // ? helps safely access nested properties that may be undefined or null 
    const parable = location.state?.parable;
    const [userToken, setUserToken] = useState("")

    useEffect(() => {
        const user_token = sessionStorage.getItem("user_token");

        if (!user_token) navigate('/login');
        else setUserToken(user_token);
    }, []);

    const handleEditParable = async (parable: Parable) => {
        console.log("Edited Parable submitted:", parable);

        // PUT logic
        fetch(`http://127.0.0.1:8000/parables/${parable.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify(parable)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to update parable");
            }

            return res.json();
        })
        .then((data) => {
            console.log("Parable updated successfully:", data);

            navigate(`/parable/${data.id}`,
                { state: {parable} }
            );
        })
        .catch((err) => console.error("Error updating parable:", err));
    }

    return (
        <div className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-gray-100 to-white">
            <Link to="/" className="self-start mb-6">
                <span className="text-xl ">
                    <IoMdArrowRoundBack />
                </span>
            </Link>

            <ParableForm onSubmit={handleEditParable} formTitle="Edit the Parable" parable={parable}/> 
        </div>
    )
} 

export default EditParable;