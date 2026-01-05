import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate, Outlet } from "react-router";

export default function IsAuthenticated() {
    const { accessToken, role } = useContext(UserContext);

    if (!accessToken) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
