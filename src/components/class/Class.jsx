import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import { UserContext } from "../../context/userContext";

export default function Class() {
    const [selectedClass, setSelectedClass] = useState({});
    const [classesName, setClassName] = useState("");
    const { username, class1, class2, class3, class4 } =
        useContext(UserContext);
    const name = useParams().className;
    // const classId = useParams().classId;

    useEffect(() => {
        if (name === "class1") {
            setClassName("1 Клас");
            setSelectedClass(class1);
        } else if (name === "class2") {
            setClassName("2 Клас");
            setSelectedClass(class2);
        } else if (name === "class3") {
            setClassName("3 Клас");
            setSelectedClass(class3);
        } else if (name === "class4") {
            setClassName("4 Клас");
            setSelectedClass(class4);
        }
    }, [name]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6 font-bold text-purple-700 text-2xl">
                    Предмети:
                </div>
                <nav className="mt-2">
                    <ul>
                        {selectedClass.subjects?.map((sub) => (
                            <li
                                key={sub._id}
                                className="block py-3 px-6 text-gray-700 hover:bg-purple-100"
                            >
                                <Link
                                    to={`/links/${name}/${selectedClass._id}/${sub._id}`}
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
                    <h1 className="text-xl font-bold text-purple-700">
                        {classesName}
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
                    <Outlet context={{ subjects: selectedClass.subjects }} />
                    <footer className="bg-white p-4 mt-10 text-center text-sm text-gray-400 border-t">
                        © 2025 All rights reserved.
                    </footer>
                </main>
            </div>
        </div>
    );
}
