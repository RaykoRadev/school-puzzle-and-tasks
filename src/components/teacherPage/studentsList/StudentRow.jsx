export default function StudentRow({
    _id,
    username,
    code,
    classId,
    createdAt,
    expiredAt,
}) {
    return (
        <tr className="border-t">
            <td className="p-4">{username}</td>
            <td className="p-4">{code}</td>
            <td className="p-4">{classId}</td>
            <td className="p-4">{createdAt}</td>
            <td className="p-4">{expiredAt}</td>
        </tr>
    );
}
