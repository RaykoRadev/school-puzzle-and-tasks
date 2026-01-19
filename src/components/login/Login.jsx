import { useContext, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router";
import { UserContext } from "../../context/userContext";
import { useLogin } from "../../hooks/useRequestHook";
import Spinner from "../spinner/Spinner";
import { useTranslation } from "react-i18next";

export default function Login() {
    // const [userData, setuserData] = useState({});
    const pathname = useResolvedPath().pathname.split("/");
    const { setLocalStorageData } = useContext(UserContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    let role = "";
    // console.log(pathname[1]);

    if (pathname.includes("teacher")) {
        role = "teacher";
    } else {
        role = "student";
    }

    const { mutate, isPending } = useLogin(role, setLocalStorageData, navigate);

    const loginSubmitHandler = async (formData) => {
        const username = formData.get("username");
        const code = formData.get("code");

        mutate({ username, code });
    };

    if (isPending) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen dark">
            <div className="w-full max-w-md bg-orange-300 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                    {t("login")}
                </h2>
                <form action={loginSubmitHandler} className="flex flex-col">
                    <input
                        placeholder={t("username")}
                        className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="text"
                        name="username"
                    />
                    <input
                        placeholder={t("code")}
                        className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        type="password"
                        name="code"
                    />

                    <button
                        className="bg-gradient-to-br from-green-600 to-emerald-400 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-700 hover:to-emerald-500 transition ease-in-out duration-150"
                        // type="submit"
                    >
                        {t("login")}
                    </button>
                </form>
            </div>
        </div>
    );
}
