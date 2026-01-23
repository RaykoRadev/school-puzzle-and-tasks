import { useTranslation } from "react-i18next";

export default function ExpiredSub() {
    const { t } = useTranslation();

    return (
        <h1
            style={{
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
            className="container relative flex flex-1 z-40 mx-auto h-screen flex items-center justify-center text-slate-900 leading-tight text-2xl sm:text-xl md:text-2xl md:ml-11 lg:text-3xl lg:ml-11"
        >
            {t("subExpired")}
        </h1>
    );
}
