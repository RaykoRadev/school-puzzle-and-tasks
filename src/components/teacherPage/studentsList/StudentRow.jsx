import { useContext, useState } from "react";
import parseDate from "../../../utils/parseDate";
import { UserContext } from "../../../context/userContext";
import visualizeClassName from "../../../utils/visualizeClassName";

export default function StudentRow({
    _id,
    username,
    code,
    classId,
    sessions,
    createdAt,
    expireAt,
    openModal,
    closeModal,
}) {
    const parsedDate = parseDate(sessions);
    const { classesIds } = useContext(UserContext);

    const studentsClassName = classesIds[classId];

    const nameForVijualize = visualizeClassName(studentsClassName);

    const modalHandler = () => {};
    return (
        <tr className="border-t">
            <td className="p-4">{username}</td>
            <td className="p-4">{code}</td>
            <td className="p-4">{nameForVijualize}</td>
            <td
                className="p-4"
                onClick={() => {
                    openModal({ sessions: parsedDate });
                }}
            >
                {parsedDate[0]}
            </td>
            <td
                className="p-4"
                onClick={() => {
                    openModal({ sessions: parsedDate }); //todo to be replaced with the object that hold the subjects and their visit
                }}
            >
                Click me
            </td>
            <td className="p-4">{createdAt}</td>
            <td className="p-4">{expireAt}</td>
        </tr>
    );
}
