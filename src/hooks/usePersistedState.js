import { useState } from "react";

export default function usePersistedState(stateKey, initstate) {
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(stateKey);

        if (!persistedState) return initstate;

        if (persistedState === "undefined") localStorage.removeItem(stateKey);

        const data = JSON.parse(persistedState);
        return data;
    });

    const setPersistedState = (data) => {
        const persistedData = JSON.stringify(data);

        localStorage.setItem(stateKey, persistedData);

        setState(data);
    };

    return [state, setPersistedState];
}
