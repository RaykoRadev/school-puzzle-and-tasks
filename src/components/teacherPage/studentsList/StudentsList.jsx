import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import StudentRow from "./StudentRow";
import LogsModal from "./LogsModal";
import { useStudentsList } from "../../../hooks/useRequestHook";
import Spinner from "../../spinner/Spinner";
import { toast } from "sonner";
import Sorting from "./Sorting";
import { useTranslation } from "react-i18next";

export default function StudentsList() {
    const { t } = useTranslation();
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
        return toast.error(t(error.message));
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
                                <th className="p-4">{t("name")}</th>
                                <th className="p-4">{t("code")}</th>
                                <th className="p-4 hidden lg:table-cell">
                                    {t("class")}
                                </th>
                                <th className="p-4">{t("lastLogin")}</th>
                                {/* <th className="p-4">visited subjects</th> */}
                                <th className="p-4 hidden lg:table-cell">
                                    {t("createdAt")}
                                </th>
                                <th className="p-4 hidden lg:table-cell">
                                    {t("expAt")}
                                </th>
                                <th className="p-4">{t("ctrl")}</th>
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
