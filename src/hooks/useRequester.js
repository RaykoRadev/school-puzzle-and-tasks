import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router";

export default function useRequest(url, initState) {
    const [result, setResult] = useState(initState);
    const { accessToken, removeLocalStorageData } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const controllerRef = useRef(null);
    const initRun = useRef(true);

    const request = async (url, method = "GET", data, role, controller) => {
        const abortController = controller || new AbortController();
        const signal = abortController.signal;

        const options = {
            method: method,
            headers: {},
            signal,
        };

        if (data) {
            options.headers = { "content-type": "application/json" }; //! ????
            options.body = JSON.stringify(data);
        }

        if (accessToken) {
            options.headers["X-Authorization"] = accessToken;
        }

        try {
            setLoading(true);
            const res = await fetch(url, options);

            if (!res.ok) {
                const err = await res.json();

                if (
                    res.status === 400 &&
                    (err.message == "jwt expired" ||
                        err.message == "invalid signature")
                ) {
                    removeLocalStorageData();
                    navigate(`${role ? `/${role}` : ""}/login`, {
                        replace: true,
                    });
                }

                throw new Error(err.message);
            }

            if (res.status == 204) {
                return res;
            } else {
                return res.json();
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!url) return;

        const abortController = new AbortController();
        controllerRef.current = abortController;
        setLoading(true);
        request(url, "GET", null, "", abortController)
            .then((res) => setResult(res))
            .catch((err) => {
                if (err?.name !== "AbortError") {
                    // showToast(err.message);
                }
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            if (initRun.current) {
                initRun.current = false;
                return;
            }
            abortController.abort();
        };
    }, [url]);

    return {
        data: result,
        setData: setResult,
        request,
        loading,
        abort: () => controllerRef.current?.abort(),
    };
}
