import { createContext, useContext } from "react";

export const UserContext = createContext({
    username: "",
    accessToken: "",
    _id: "",
    role: "",
    teacherId: "",
    classId: "",
    classesIds: {},
    setLocalStorageData(data) {},
    removeLocalStorageData() {},
});

export function useUserContext() {
    const data = useContext(UserContext);
    return data;
}
