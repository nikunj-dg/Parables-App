import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    setLoggedIn: (value: boolean) => void;
}

const Login = ({ setLoggedIn }: LoginProps) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [login, setLogin] = useState(true) // If false, show signup 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (login) {
            console.log("User Login");

            // Login
            fetch(`http://127.0.0.1:8000/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to authenticate user");
                }

                return res.json();
            })
            .then((data) => {
                console.log("User authenticated successfully:", data);

                sessionStorage.setItem("user_token", data.user_token);
                setLoggedIn(true);

                navigate(`/`);
            })
            .catch((err) => console.error("Error authenticating user:", err));
        }
        else {
            console.log("Create User");

            // Create user
            fetch(`http://127.0.0.1:8000/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    username: username,
                    password: password
                })
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to create user");
                }

                return res.json();
            })
            .then((data) => {
                console.log("User created successfully:", data);

                navigate(`/login`);
            })
            .catch((err) => console.error("Error creating user:", err));
        }
    }

  return (
    <div className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-gray-100 to-white">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
            <div className="text-xl font-bold text-gray-800 mb-4 text-center">
                <span className={`px-3 py-2 rounded-l-lg ${ login ? "bg-gray-100" : null }`} onClick={() => setLogin(!login)} >Log In</span>
                <span className={`px-3 py-2 rounded-r-lg ${ login ? null : "bg-gray-100" }`} onClick={() => setLogin(!login)} >Sign Up</span>
            </div>

            <div className="text-base p-3">
                <label htmlFor="username">Username</label>
                <div className="mb-3 mt-2">
                    <input id="username" name="username" className="bg-gray-100 rounded-md w-96 p-3" type="text" value={username} 
                    onChange={(e) => setUsername(e.target.value)} required></input>
                </div>
                <label htmlFor="password">Password</label>
                <div className="mb-3 mt-2">
                    <input id="password" name="password"  className="bg-gray-100 rounded-md w-96 p-3" type="password" value={password} 
                    onChange={(e) => setPassword(e.target.value)} required></input>
                </div>

                { !login && ( 
                    <>
                        <label htmlFor="name">Name</label>
                        <div className="mb-3 mt-2">
                            <input id="name" name="name" className="bg-gray-100 rounded-md w-96 p-3" type="text" value={name} 
                            onChange={(e) => setName(e.target.value)} required></input>
                        </div>
                        <label htmlFor="surname">Surname</label>
                        <div className="mb-3 mt-2">
                            <input id="surname" name="surname" className="bg-gray-100 rounded-md w-96 p-3" type="text" value={surname} 
                            onChange={(e) => setSurname(e.target.value)} required></input>
                        </div>
                    </>
                ) }

                <button className="bg-gray-100 rounded-md shadow-md hover:shadow-xl transition duration-200 p-3 mt-3 text-md">
                    Submit
                </button>
            </div>
        </form>
    </div>
  );
};

export default Login;
