import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router";
import { UserContext } from "../../context/userContext";

export default function TeacherPage() {
    const { username } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState("Dashboard");
    const pathname = useLocation().pathname;

    useEffect(() => {
        if (pathname.includes("students-list")) {
            setPageTitle("Students List");
        } else if (pathname.includes("profile")) {
            setPageTitle("Settings");
        } else {
            setPageTitle("Dashboard");
        }
    }, [pathname]);

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
                className={`
                    fixed md:static z-30
                    w-64 bg-orange-100 shadow-md
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                <div className="p-6 font-bold text-green-600 text-2xl">
                    AdminPanel
                </div>

                <nav className="mt-8">
                    <Link
                        to="/teacher/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-6 text-gray-700 hover:bg-green-100"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/teacher/dashboard/students-list"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-6 text-gray-700 hover:bg-green-100"
                    >
                        Users
                    </Link>
                    {/* <Link
                        to="#"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-6 text-gray-700 hover:bg-green-100"
                    >
                        Analytics
                    </Link>
                    <Link
                        to="/teacher/dashboard/profile"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-6 text-gray-700 hover:bg-green-100"
                    >
                        Settings
                    </Link> */}
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
