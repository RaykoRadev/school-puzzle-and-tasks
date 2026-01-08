import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import StudentRow from "./StudentRow";
import LogsModal from "./LogsModal";
import { useStudentsList } from "../../../hooks/useRequestHook";
import Spinner from "../../spinner/Spinner";
import { toast } from "sonner";

export default function StudentsList() {
    const { _id, accessToken } = useContext(UserContext);
    const [modal, setModal] = useState({ open: false, payload: null });

    const { data, isPending, error } = useStudentsList(accessToken);

    if (isPending) {
        return <Spinner />;
    }

    if (error) {
        return toast.error(error.message);
    }

    const openModal = (payload) => {
        setModal({ open: true, payload });
    };

    const closeModal = () => {
        setModal({ open: false, payload: null });
    };

    //todo sorting when the conmponent design is finalised

    return (
        <div className="bg-orange-200 rounded-lg shadow-md">
            <table className="w-full text-left">
                <thead className="bg-orange-100">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Code</th>
                        <th className="p-4">Class</th>
                        <th className="p-4">Last login</th>
                        <th className="p-4">visited subjects</th>
                        <th className="p-4">Created at:</th>
                        <th className="p-4">Expired at:</th>
                        <th className="p-4">Controls:</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((student) => (
                        <StudentRow
                            key={student._id}
                            {...student}
                            studentId={student._id}
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
