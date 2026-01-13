import { useContext, useState } from "react";
import { useAllAvatars, useUpdateAvatar } from "../../hooks/useRequestHook";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router";

export default function ModalAvatars({ onClose }) {
    const { _id, accessToken, role, setLocalStorageData } =
        useContext(UserContext);
    const [selectedAvatarId, setSelectedAvatarId] = useState("");
    const navigate = useNavigate();
    const { data } = useAllAvatars();
    const changeAvatar = useUpdateAvatar(
        accessToken,
        role,
        _id,
        setLocalStorageData
    );

    const avatarHandler = async () => {
        const newAvatar = data.find((av) => av._id === selectedAvatarId);

        changeAvatar.mutate({ avatar: newAvatar.imgUrl });
    };

    return (
        <>
            <div className="backdrop" onClick={onClose}></div>
            <div id="modal">
                <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
                    <div className="w-full max-w-md bg-orange-100 shadow-lg rounded-lg p-6 relative">
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
                        <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
                            <div className="flex items-center justify-between mt-4 mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                    Аватари
                                </h2>
                                <button
                                    onClick={() => {
                                        avatarHandler();
                                        onClose();
                                    }}
                                    className={`rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-md transition ${
                                        selectedAvatarId
                                            ? "bg-gradient-to-br from-green-600 to-emerald-400 hover:scale-[1.03]"
                                            : "bg-gray-400 cursor-not-allowed"
                                    } `}
                                >
                                    Избери
                                </button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                {data?.map((avatar) => (
                                    <div
                                        key={avatar._id}
                                        className={`cursor-pointer bg-white flex flex-col rounded-sm overflow-hidden shadow-md transition-all relative ${
                                            selectedAvatarId === avatar._id
                                                ? "ring-4 ring-green-500 scale-[1.05]"
                                                : "hover:scale-[1.05]"
                                        } `}
                                        onClick={() => {
                                            setSelectedAvatarId(avatar._id);
                                        }}
                                    >
                                        <div className="w-full">
                                            <img
                                                src={avatar.imgUrl}
                                                alt="Product-1"
                                                className="w-full aspect-[1/1] object-cover object-top"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
