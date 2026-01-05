import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate, Outlet } from "react-router";

export default function IsTeacher() {
    const { accessToken, role, teacherId, classId } = useContext(UserContext);

    if (!accessToken) {
        return <Navigate to="/" />;
    }

    if (accessToken && role !== "teacher") {
        return <Navigate to={`/links/${teacherId}/${classId}`} />;
    }

    return <Outlet />;
}
