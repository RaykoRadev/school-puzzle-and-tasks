import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import useRequest from "../../../hooks/useRequester";
import { endPoints, host } from "../../../config/constants";
import StudentRow from "./StudentRow";
import LogsModal from "./LogsModal";

export default function StudentsList() {
    const { _id } = useContext(UserContext);
    const { data } = useRequest(host + endPoints.getAllStudents, []);
    const [modal, setModal] = useState({ open: false, payload: null });

    const openModal = (payload) => {
        setModal({ open: true, payload });
    };

    const closeModal = () => {
        setModal({ open: false, payload: null });
    };

    //todo sorting when the conmponent design is finalised

    return (
        <div className="bg-white rounded-lg shadow-md">
            <table className="w-full text-left">
                <thead className="bg-purple-50">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Code</th>
                        <th className="p-4">Last login</th>
                        <th className="p-4">visited subjects</th>
                        <th className="p-4">Created at:</th>
                        <th className="p-4">Expired at:</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student) => (
                        <StudentRow
                            key={student._id}
                            {...student}
                            openModal={openModal}
                            closeModal={closeModal}
                        />
                    ))}
                </tbody>
            </table>
            {modal.open && (
                <LogsModal onClose={closeModal} data={modal.payload} />
            )}
        </div>
    );
}
