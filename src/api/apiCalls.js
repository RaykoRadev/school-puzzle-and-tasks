import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { toast } from "sonner";
import i18n from "../i18n";

let sessionExpiredHandled = false;

export default async function fetchRequest(
    url,
    method = "GET",
    signal,
    accessToken,
    data,
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

            const isSessionExpired =
                errorBody?.message === "jwt expired" ||
                errorBody?.message === "invalid signature" ||
                errorBody?.message === "invalid token";

            if (isSessionExpired && !sessionExpiredHandled) {
                sessionExpiredHandled = true;

                localStorage.removeItem("user");
                window.location.replace("/");
                toast.error(i18n.t("expSession"));

                return;
            }

            throw new Error(
                errorBody.message || `Request failed with ${res.status}`,
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
