import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();
    return (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-10">
            <div className="max-w-screen-xl w-full">
                <div className="max-w-4xl mx-auto text-center">
                    <h1
                        style={{
                            fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        }}
                        className="text-slate-900 font-bold leading-tight text-2xl sm:text-3xl md:text-3xl md:ml-11 lg:text-5xl lg:ml-11"
                    >
                        <p>{t("welcome")}</p>
                        <p>{t("welcome1")}</p>
                    </h1>
                </div>
            </div>
        </div>
    );
}
