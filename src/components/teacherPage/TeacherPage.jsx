import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router";
import { UserContext } from "../../context/userContext";
import { useTranslation } from "react-i18next";

export default function TeacherPage() {
    const { username } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState("");
    const { t } = useTranslation();
    const pathname = useLocation().pathname;

    useEffect(() => {
        if (pathname.includes("students-list")) {
            setPageTitle(t("studentsList"));
        } else if (pathname.includes("profile")) {
            setPageTitle(t("settings"));
        } else {
            setPageTitle(t("dashboard"));
        }
    }, [pathname, t]);

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
                className={`fixed md:static z-30 top-16 left-0 w-40 md:w-64 bg-orange-100 shadow-md transform transition-transform duration-300 ${isOpen ? "translate-x-0 h-[calc(100vh-4rem)]" : "-translate-x-full"} md:translate-x-0 md:h-auto`}
            >
                <div className="p-6 font-bold text-green-600 text-2xl">
                    {t("admPanel")}
                </div>

                <nav className="mt-8">
                    <NavLink
                        to="/teacher/dashboard"
                        onClick={() => setIsOpen(false)}
                        end
                        className={({ isActive }) =>
                            `block py-3 px-6 text-gray-700 hover:bg-green-300 ${
                                isActive
                                    ? "bg-green-200 font-semibold text-green-900"
                                    : ""
                            }`
                        }
                    >
                        {t("dashboard")}
                    </NavLink>
                    <NavLink
                        to="/teacher/dashboard/students-list"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `block py-3 px-6 text-gray-700 hover:bg-green-300 ${
                                isActive
                                    ? "bg-green-200 font-semibold text-green-900"
                                    : ""
                            }`
                        }
                    >
                        {t("users")}
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="bg-orange-300 shadow-md p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* Hamburger for mobile */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="md:hidden text-green-600 text-2xl"
                        >
                            ☰
                        </button>

                        <h1 className="text-xl font-bold text-green-600">
                            {pageTitle}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* <input
                            type="text"
                            placeholder="Search..."
                            className="hidden sm:block px-4 py-2 border rounded-lg"
                        /> */}
                        <div className="w-10 h-10 mr-3 flex items-center justify-center font-bold text-green-600 text-lg">
                            {username}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6 space-y-6 flex-1 bg-orange-200">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
