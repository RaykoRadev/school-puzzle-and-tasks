import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

export default function StudentsList() {
    const { _id } = useContext(UserContext);
    return (
        <div className="bg-white rounded-lg shadow-md">
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
                        <td className="p-4 text-green-600 font-bold">Active</td>
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
        </div>
    );
}
