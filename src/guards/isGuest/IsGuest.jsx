import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate, Outlet } from "react-router";

export default function IsGuest() {
    const { accessToken, role, teacherId, classId, _id } =
        useContext(UserContext);

    if (accessToken && role === "student") {
        return <Navigate to={`/links/${teacherId}/${classId}`} />;
    }

    if (accessToken && role === "teacher") {
        return <Navigate to={`/${_id}/allCLasses`} />;
    }

    return <Outlet />;
}
