import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default async function fetchRequest(
    url,
    method = "GET",
    signal,
    accessToken,
    data
) {
    // const { removeLocalStorageData } = useContext(UserContext);
    const options = {
        method,
        headers: {},
    };

    if (data && method !== "GET") {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    if (signal) {
        options.signal = signal;
    }

    if (accessToken) {
        options.headers["X-Authorization"] = accessToken;
    }

    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            const errorBody = await res.json();
            if (errorBody.message === "jwt expired") {
                //? there could be problems with that using a hook
                // removeLocalStorageData();
            }
            throw new Error(
                errorBody.message || `Request failed with ${res.status}`
            );
        }

        if (res.status === 204) return null;

        return res.json();
    } catch (err) {
        if (err.name === "AbortError") {
            return;
        }
        throw err;
    }
}
