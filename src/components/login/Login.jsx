import { useEffect, useState } from "react";
import { useLocation, useResolvedPath } from "react-router";
import { useParams } from "react-router";

const host = import.meta.env.VITE_API_URL;

export default function Login() {
    const [userData, setuserData] = useState({});
    const [role, setRole] = useState("/student");
    const pathname = useResolvedPath().pathname;

    console.log(host + role + "/register");

    const loginSubmitHandler = (formData) => {
        if (pathname.includes("/admin")) {
            setRole("/admin");
        }
        const username = formData.get("username");
        const code = formData.get("code");

        fetch(host + role + "/register", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, code }),
        })
            .then((res) => res.json())
            .then((resData) => {
                setuserData(resData);
                console.log(resData);
                return resData;
            });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen dark">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">
                        Login
                    </h2>
                    <form action={loginSubmitHandler} className="flex flex-col">
                        <input
                            placeholder="Username"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="username"
                        />
                        <input
                            placeholder="Code"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="code"
                        />

                        <button
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            // type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
