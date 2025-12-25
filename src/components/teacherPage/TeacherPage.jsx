import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router";
import { UserContext } from "../../context/userContext";

export default function TeacherPage() {
    const { username } = useContext(UserContext);
    const [pageTitele, setPageTitle] = useState("Dashboard");
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
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6 font-bold text-purple-700 text-2xl">
                    AdminPanel
                </div>
                <nav className="mt-8">
                    <Link
                        to="/teacher/dashboard"
                        className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/teacher/dashboard/students-list"
                        className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
                    >
                        Users
                    </Link>
                    <Link
                        to="#"
                        className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
                    >
                        Analytics
                    </Link>
                    <Link
                        to="/teacher/dashboard/profile"
                        className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
                    >
                        Settings
                    </Link>
                </nav>
            </aside>
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-purple-700">
                        {pageTitele}
                    </h1>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-2 border rounded-lg"
                        />
                        <div className="w-10 h-10 flex items-center justify-center font-bold">
                            {username}
                        </div>
                    </div>
                </header>
                {/* Content */}
                <main className="p-6 space-y-6">
                    <Outlet />
                    <footer className="bg-white p-4 mt-10 text-center text-sm text-gray-400 border-t">
                        © 2025 AdminPanel. All rights reserved.
                    </footer>
                </main>
            </div>
        </div>
    );
}
