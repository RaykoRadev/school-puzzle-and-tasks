import { useContext, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router";
import { UserContext } from "../../context/userContext";
import useRequest from "../../hooks/useRequester";

const host = import.meta.env.VITE_API_URL;

export default function Login() {
    const [userData, setuserData] = useState({});
    const pathname = useResolvedPath().pathname.split("/");
    const { setLocalStorageData } = useContext(UserContext);
    const { request } = useRequest();
    const navigate = useNavigate();

    let role = "";
    console.log(pathname[1]);

    const loginSubmitHandler = async (formData) => {
        if (pathname.includes("teacher")) {
            role = "teacher";
        } else {
            role = "student";
        }
        const username = formData.get("username");
        const code = formData.get("code");

        const result = await request(
            host + "/" + role + "/login",
            "POST",
            { username, code },
            role
        );

        setLocalStorageData(result);
        setuserData(result);
        if (role === "teacher") {
            navigate("/");
        } else {
            // navigate(`/tasks/${result.classId}`)
        }
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
