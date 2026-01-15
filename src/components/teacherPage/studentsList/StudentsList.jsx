import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import StudentRow from "./StudentRow";
import LogsModal from "./LogsModal";
import { useStudentsList } from "../../../hooks/useRequestHook";
import Spinner from "../../spinner/Spinner";
import { toast } from "sonner";
import Sorting from "./Sorting";

export default function StudentsList() {
    const { accessToken } = useContext(UserContext);
    const [modal, setModal] = useState({ open: false, payload: null });

    const { data, isPending, error } = useStudentsList(accessToken);
    const [students, setStudents] = useState(data);

    useEffect(() => {
        if (data) {
            setStudents(data);
        }
    }, [data]);

    const sortedData = (sorted) => {
        setStudents(sorted);
    };

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

    return (
        <>
            {/* <div className="realtive"></div> */}
            <Sorting data={data} sortedData={sortedData} />
            <div className="bg-orange-200 rounded-lg shadow-md">
                <div className="bg-orange-200 rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-orange-100">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Code</th>
                                <th className="p-4 hidden lg:table-cell">
                                    Class
                                </th>
                                <th className="p-4">Last login</th>
                                {/* <th className="p-4">visited subjects</th> */}
                                <th className="p-4 hidden lg:table-cell">
                                    Created at:
                                </th>
                                <th className="p-4 hidden lg:table-cell">
                                    Expired at:
                                </th>
                                <th className="p-4">Controls:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students?.map((student) => (
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
                </div>
                {modal.open && (
                    <LogsModal onClose={closeModal} data={modal.payload} />
                )}
            </div>
        </>
    );
}
