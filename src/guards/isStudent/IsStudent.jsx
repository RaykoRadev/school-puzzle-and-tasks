import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate, Outlet } from "react-router";

export default function IsStudent() {
    const { accessToken, role } = useContext(UserContext);

    if (!accessToken) {
        return <Navigate to="/" />;
    }

    if (accessToken && role !== "student") {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
