import { useState } from "react";
import parseDate from "../../../utils/parseDate";

export default function StudentRow({
    _id,
    username,
    code,
    classId,
    sessions,
    createdAt,
    expireAt,
}) {
    const lastLoginAt = sessions?.[sessions.length - 1]?.loginAt;

    let parsedDate = "There is no logs";

    if (lastLoginAt) {
        const date = new Date(lastLoginAt);

        if (!isNaN(date.getTime())) {
            parsedDate = parseDate(date);
        }
    }
    return (
        <tr className="border-t">
            <td className="p-4">{username}</td>
            <td className="p-4">{code}</td>
            <td className="p-4">{parsedDate}</td>
            <td className="p-4">{createdAt}</td>
            <td className="p-4">{expireAt}</td>
        </tr>
    );
}
