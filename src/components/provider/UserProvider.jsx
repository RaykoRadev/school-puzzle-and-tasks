import { UserContext } from "../../context/userContext";
import usePersistedState from "../../hooks/usePersistedState";

export default function UserProvider({ children }) {
    const [auth, setAuth] = usePersistedState("user", {});

    const setLocalStorageData = (userData) => {
        setAuth(userData);
    };

    const removeLocalStorageData = () => {
        setAuth(null);
    };

    return (
        <UserContext.Provider
            value={{ ...auth, setLocalStorageData, removeLocalStorageData }}
        >
            {children}
        </UserContext.Provider>
    );
}
