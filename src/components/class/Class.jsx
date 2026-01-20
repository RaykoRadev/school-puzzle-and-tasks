import { useContext, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router";
import { UserContext } from "../../context/userContext";
import visualizeClassName from "../../utils/visualizeClassName";
import { useOneClass } from "../../hooks/useRequestHook";
import Spinner from "../spinner/Spinner";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Class() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { username, role, _id, teacherId, accessToken } =
        useContext(UserContext);
    const classId = useParams().classId;

    const variablId = teacherId !== undefined ? teacherId : _id;

    //? Probably there is a way to be avoided the request using cash or something like that

    const { data, isPending, error } = useOneClass(
        accessToken,
        role,
        variablId,
        classId,
    );

    if (isPending) {
        return <Spinner />;
    }

    if (error) {
        return toast.error(t(error.message));
    }

    return (
        <div className="flex flex-1 bg-gray-100">
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static z-30 top-0 left-0 w-45 md:w-64 bg-orange-100 shadow-md transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0 h-screen" : "-translate-x-full"
                } md:translate-x-0
    `}
            >
                <div className="p-6 font-bold text-green-600 text-2xl">
                    {t("subjects")}:
                </div>

                <nav className="mt-2">
                    <ul>
                        {data?.classes[0].subjects?.map((sub) => (
                            <li
                                key={sub._id}
                                // className="py-3 px-6 text-gray-700 hover:bg-green-100"
                            >
                                <NavLink
                                    onClick={() => setIsOpen(false)}
                                    to={`/links/${
                                        role === "teacher" ? _id : teacherId
                                    }/${data?.classes[0].classId}/${sub._id}`}
                                    className={({ isActive }) =>
                                        `block py-3 px-6 text-gray-700 hover:bg-green-300 ${
                                            isActive
                                                ? "bg-green-200 font-semibold text-green-900"
                                                : ""
                                        }`
                                    }
                                >
                                    {/* {sub.visualizationName} */}
                                    {t(sub.name)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="bg-orange-300 shadow-md p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* Hamburger */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="md:hidden text-green-600"
                        >
                            ☰
                        </button>

                        <h1 className="text-xl font-bold text-green-600">
                            {/* {visualizeClassName(data?.classes[0].name)} */}
                            {t(data?.classes[0].name)}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 mr-3 flex items-center justify-center font-bold text-green-600 text-lg">
                            {username}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6 space-y-6 flex-1 bg-orange-200">
                    <Outlet context={{ subjects: data?.classes[0].subjects }} />
                </main>
            </div>
        </div>
    );
}
