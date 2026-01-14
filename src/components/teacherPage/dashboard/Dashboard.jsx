import { useState } from "react";
import { Link } from "react-router";
import ModalCodeEdit from "../modalCodeEdit/ModalCodeEdit";

export default function Dashboard() {
    const [modal, setModalShow] = useState(false);

    const closeModal = () => {
        setModalShow(false);
    };
    return (
        <>
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-sm text-gray-500">Total Users</p>
                            <h2 className="text-3xl font-bold text-purple-700 mt-2">
                                1,240
                            </h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-sm text-gray-500">Revenue</p>
                            <h2 className="text-3xl font-bold text-green-600 mt-2">
                                $24,500
                            </h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-sm text-gray-500">New Orders</p>
                            <h2 className="text-3xl font-bold text-blue-600 mt-2">
                                320
                            </h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-sm text-gray-500">
                                Pending Tickets
                            </p>
                            <h2 className="text-3xl font-bold text-red-500 mt-2">
                                12
                            </h2>
                        </div>
                    </div> */}
            {/* list of last online students */}
            {/* <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b font-bold text-purple-700">
                    User List
                </div>
                <table className="w-full text-left">
                    <thead className="bg-purple-50">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="p-4">John Doe</td>
                            <td className="p-4">john@example.com</td>
                            <td className="p-4">Admin</td>
                            <td className="p-4 text-green-600 font-bold">
                                Active
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-4">Jane Smith</td>
                            <td className="p-4">jane@example.com</td>
                            <td className="p-4">Editor</td>
                            <td className="p-4 text-yellow-500 font-bold">
                                Pending
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
            {/* links board  control*/}
            <div className="p-4 border-b font-bold text-green-600">
                Controll links / Забъркай манджа с грозде
            </div>
            <div className="bg-orange-200 p-6 rounded-lg shadow-md grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <Link
                    to="/teacher/create-link"
                    className="bg-green-600 text-white py-3 rounded-lg shadow hover:bg-purple-700"
                >
                    Add Link
                </Link>
                <Link
                    to="/teacher/create-student"
                    className="bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 text-center"
                >
                    Add Student
                </Link>
                <button
                    onClick={() => {
                        setModalShow(true);
                    }}
                    className="bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-red-700 text-center"
                >
                    Edit Profile / Password
                </button>
            </div>
            {modal && <ModalCodeEdit onClose={closeModal} />}
            {/* student board control */}
            {/* <div className="p-4 border-b font-bold text-purple-700">
                Controll students
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <Link
                    to="/teacher/create-student"
                    className="bg-green-600 text-white py-3 rounded-lg shadow hover:bg-purple-700"
                >
                    Add student
                </Link>
                <Link
                    to=""
                    className="bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 text-center"
                >
                    Edit student
                </Link>
                <Link
                    to=""
                    className="bg-red-600 text-white py-3 rounded-lg shadow hover:bg-red-700 text-center"
                >
                    Delete student
                </Link>
            </div> */}
        </>
    );
}
