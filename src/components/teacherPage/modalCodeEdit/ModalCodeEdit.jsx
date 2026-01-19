import { toast } from "sonner";
import { useCodeEdit } from "../../../hooks/useRequestHook";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useTranslation } from "react-i18next";

export default function ModalCodeEdit({ onClose }) {
    const { accessToken } = useContext(UserContext);
    const navigate = useNavigate();
    const { mutate, isPending } = useCodeEdit(accessToken, navigate);
    const { t } = useTranslation();

    const submitHandler = async (formData) => {
        const oldCode = formData.get("oldCode");
        const code = formData.get("code");
        const repCode = formData.get("repCode");

        if (repCode !== code) {
            toast.error("Codes missmaths!!!");
            return;
        }

        mutate({ oldCode, code });
    };
    return (
        <>
            <div className="backdrop" onClick={onClose}></div>
            <div id="modal">
                <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
                    <div className="flex flex-col items-center justify-center h-screen ">
                        <div className="w-full max-w-md bg-orange-300 rounded-lg shadow-md p-6 relative">
                            <svg
                                onClick={onClose}
                                id="closeIcon"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-green-700 float-right"
                                viewBox="0 0 320.591 320.591"
                            >
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"
                                />
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"
                                />
                            </svg>
                            <h2 className="text-2xl font-bold text-green-600 mb-4">
                                {t("editCode")}
                            </h2>
                            <form
                                action={submitHandler}
                                className="flex flex-col"
                            >
                                <input
                                    placeholder={t("oldCode")}
                                    className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    type="password"
                                    name="oldCode"
                                />
                                <input
                                    placeholder={t("code")}
                                    className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    type="password"
                                    name="code"
                                />
                                <input
                                    placeholder={t("repeatCode")}
                                    className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    type="password"
                                    name="repCode"
                                />

                                <button
                                    className="bg-gradient-to-br from-green-600 to-emerald-400 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-700 hover:to-emerald-500 transition ease-in-out duration-150"
                                    // type="submit"
                                >
                                    {t("editCode")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
