import { useContext, useState } from "react";
import parseDate from "../../../utils/parseDate";
import { UserContext } from "../../../context/userContext";
import DeleteModal from "../../deleteModal/DeleteModal";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function StudentRow({
    studentId,
    username,
    code,
    classId,
    sessions,
    createdAt,
    expireAt,
    openModal,
}) {
    const parsedDate = parseDate(sessions);
    const parsedCreatedAt = parseDate(createdAt);
    const parsedExpiredAt = parseDate(expireAt);

    const { classesIds, _id } = useContext(UserContext);
    const [modal, setShowModal] = useState(false);
    const { t } = useTranslation();

    const studentsClassName = classesIds[classId];

    //todo may be needed to add use effect bcz when the language is change the array with last lods is not refreshed

    const deleteModalHandler = () => {
        setShowModal(false);
    };
    return (
        <tr className="border-t">
            <td className="p-4">{username}</td>
            <td className="p-4">{code}</td>
            {/* class */}
            <td className="p-4 hidden lg:table-cell">{t(studentsClassName)}</td>
            {/* last login */}
            <td
                className="p-4"
                onClick={() => {
                    openModal({ sessions: parsedDate });
                }}
            >
                {parsedDate[0]}
            </td>
            {/* <td
                className="p-4"
                onClick={() => {
                    openModal({ sessions: parsedDate }); //todo to be replaced with the object that hold the subjects and their visit
                }}
            >
                Click me
            </td> */}
            <td className="p-4 hidden lg:table-cell">{parsedCreatedAt}</td>
            <td className="p-4 hidden lg:table-cell">{parsedExpiredAt}</td>
            <td className="p-4">
                <div className="flex justify-around items-center py-3">
                    <div className="flex gap-2 text-gray-600 duration-200 hover:cursor-pointer">
                        <Link to={`/${_id}/${studentId}/edit`}>
                            <button className="font-semibold text-sm text-green-700">
                                <svg
                                    className="w-6 stroke-green-700 hover:scale-110"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                    <div className="flex gap-2 text-gray-600  duration-200 hover:cursor-pointer">
                        <button
                            onClick={() => setShowModal(true)}
                            className="font-semibold text-sm text-red-700"
                        >
                            <svg
                                className="w-6 stroke-red-700 hover:scale-110"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                <line x1={10} y1={11} x2={10} y2={17} />
                                <line x1={14} y1={11} x2={14} y2={17} />
                            </svg>
                        </button>
                        {modal && (
                            <DeleteModal
                                onClose={deleteModalHandler}
                                itemId={studentId}
                                itemType="student"
                            />
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
}
