import { createContext, useContext } from "react";

export const UserContext = createContext({
    username: "",
    accessToken: "",
    _id: "",
    role: "",
    teacherId: "",
    classId: "",
    // class1: {},
    // class2: {},
    // class3: {},
    // class4: {},
    setLocalStorageData(data) {},
    removeLocalStorageData() {},
});

export function useUserContext() {
    const data = useContext(UserContext);
    return data;
}
