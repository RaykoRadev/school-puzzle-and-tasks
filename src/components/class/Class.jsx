import { useContext, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import { UserContext } from "../../context/userContext";
import visualizeClassName from "../../utils/visualizeClassName";
import { useOneClass } from "../../hooks/useRequestHook";
import Toasts from "../toasts/Toasts";
import Spinner from "../spinner/Spinner";

export default function Class() {
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
        classId
    );

    if (isPending) {
        return <Spinner />;
    }

    if (error) {
        // return <Toasts message={error.message} />;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static z-30 w-64 bg-white shadow-md min-h-screen transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0
    `}
            >
                <div className="p-6 font-bold text-purple-700 text-2xl">
                    Предмети:
                </div>

                <nav className="mt-2">
                    <ul>
                        {data?.classes[0].subjects?.map((sub) => (
                            <li
                                key={sub._id}
                                className="py-3 px-6 text-gray-700 hover:bg-purple-100"
                            >
                                <Link
                                    onClick={() => setIsOpen(false)}
                                    to={`/links/${
                                        role === "teacher" ? _id : teacherId
                                    }/${data?.classes[0].classId}/${sub._id}`}
                                >
                                    {sub.visualizationName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* Hamburger */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="md:hidden text-purple-700"
                        >
                            ☰
                        </button>

                        <h1 className="text-xl font-bold text-purple-700">
                            {visualizeClassName(data?.classes[0].name)}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="hidden sm:block px-4 py-2 border rounded-lg"
                        />
                        <div className="w-10 h-10 flex items-center justify-center font-bold">
                            {username}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6 space-y-6 flex-1">
                    <Outlet context={{ subjects: data?.classes[0].subjects }} />

                    <footer className="bg-white p-4 mt-10 text-center text-sm text-gray-400 border-t">
                        © 2025 All rights reserved.
                    </footer>
                </main>
            </div>
        </div>
    );
}
