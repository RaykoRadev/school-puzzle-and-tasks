import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import useRequest from "../../../hooks/useRequester";
import { endPoints, host } from "../../../config/constants";
import StudentRow from "./StudentRow";

export default function StudentsList() {
    const { _id } = useContext(UserContext);
    const { data } = useRequest(host + endPoints.getAllStudents, []);
    //todo sorting when the conmponent design is finalised

    return (
        <div className="bg-white rounded-lg shadow-md">
            <table className="w-full text-left">
                <thead className="bg-purple-50">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Code</th>
                        <th className="p-4">Last login</th>
                        <th className="p-4">Created at:</th>
                        <th className="p-4">Expired at:</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student) => (
                        <StudentRow key={student._id} {...student} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
