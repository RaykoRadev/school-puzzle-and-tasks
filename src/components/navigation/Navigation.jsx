import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { UserContext } from "../../context/userContext";
import { useLogout } from "../../hooks/useRequestHook";
import { Toaster } from "sonner";

export default function Navigation() {
    const {
        role,
        _id,
        accessToken,
        username,
        removeLocalStorageData,
        teacherId,
        classId,
    } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const { mutate } = useLogout(
        role,
        removeLocalStorageData,
        accessToken,
        navigate
    );

    return (
        <header className="sticky top-0 z-50 bg-orange-100 backdrop-blur-md">
            <nav className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-4 lg:px-12">
                {/* Logo */}
                <div className="relative flex items-center">
                    {role === "teacher" && (
                        <Link to={`/${_id}/allClasses`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={28}
                                height={28}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#1bb163"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-notebook-icon lucide-notebook"
                            >
                                <path d="M2 6h4" />
                                <path d="M2 10h4" />
                                <path d="M2 14h4" />
                                <path d="M2 18h4" />
                                <rect
                                    width={16}
                                    height={20}
                                    x={4}
                                    y={2}
                                    rx={2}
                                />
                                <path d="M16 2v20" />
                            </svg>
                        </Link>
                    )}
                    {role === "student" && (
                        <Link to={`/links/${teacherId}/${classId}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={28}
                                height={28}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#1bb163"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-notebook-icon lucide-notebook"
                            >
                                <path d="M2 6h4" />
                                <path d="M2 10h4" />
                                <path d="M2 14h4" />
                                <path d="M2 18h4" />
                                <rect
                                    width={16}
                                    height={20}
                                    x={4}
                                    y={2}
                                    rx={2}
                                />
                                <path d="M16 2v20" />
                            </svg>
                        </Link>
                    )}
                </div>

                <div className="flex-grow" />

                {/* Desktop buttons */}
                <div className="hidden items-center gap-6 md:flex">
                    {!username && (
                        <NavLink
                            to="/student/login"
                            className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 text-sm font-medium text-white shadow-md transition hover:scale-[1.03]"
                        >
                            Впиши се ученик
                        </NavLink>
                    )}
                    {!username && (
                        <NavLink
                            to="/teacher/login"
                            className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 text-sm font-medium text-white shadow-md transition hover:scale-[1.03]"
                        >
                            Впиши се учител
                        </NavLink>
                    )}

                    {role && (
                        <NavLink
                            to={
                                role === "teacher"
                                    ? "/teacher/dashboard"
                                    : "/student-profile"
                            }
                            className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                        >
                            Profile
                        </NavLink>
                    )}

                    {username && (
                        <NavLink
                            onClick={() => mutate()}
                            className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                        >
                            Logout
                        </NavLink>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                                menuOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16M4 18h16"
                            }
                        />
                    </svg>
                </button>
            </nav>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden absolute right-4 top-16 w-min-25 bg-orange-200 rounded-xl shadow-lg p-4 space-y-3">
                    {!username && (
                        <NavLink
                            to="/student/login"
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-2 text-center text-sm font-medium text-white"
                        >
                            Впиши се ученик
                        </NavLink>
                    )}
                    {!username && (
                        <NavLink
                            to="/teacher/login"
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-2 text-center text-sm font-medium text-white"
                        >
                            Впиши се учител
                        </NavLink>
                    )}
                    {role && (
                        <NavLink
                            to={
                                role === "teacher"
                                    ? "/teacher/dashboard"
                                    : "/student-profile"
                            }
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-2 text-center text-sm font-medium text-white"
                        >
                            Profile
                        </NavLink>
                    )}
                    {username && (
                        <NavLink
                            onClick={() => {
                                mutate();
                                setMenuOpen(false);
                            }}
                            className="block rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-2 text-center text-sm font-medium text-white"
                        >
                            Logout
                        </NavLink>
                    )}
                </div>
            )}
            <Toaster
                richColors
                position="top-right"
                toastOptions={{ style: { width: "fit-content" } }}
            />
        </header>
    );
}
