import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import ModalAvatars from "./ModalAvatars";
import { useNavigate } from "react-router";

export default function StudentsProfile() {
    const { username, avatar, role, _id } = useContext(UserContext);
    const [modal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const avatarModalHandler = () => {
        setShowModal(false);
    };
    return (
        <section className="flex-1 flex items-center justify-center p-4">
            <div className="w-full md:w-1/2 md:mx-auto flex flex-col md:flex-row items-center justify-center text-center ">
                <div className="bg-orange-200 border-2 border-emerald-400 rounded-lg flex flex-col md:flex-row items-center justify-center px-14 py-7 relative">
                    <svg
                        onClick={() => navigate(-1)}
                        id="closeIcon"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 cursor-pointer fill-gray-400 hover:fill-green-700 absolute top-2 right-2"
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
                    <img
                        className="inline-flex object-cover border-4 border-emerald-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-emerald-600/100 bg-indigo-50 h-24 w-24 !h-32 !w-32 mb-4 md:mb-0 ml-0 md:mr-5"
                        src={
                            avatar ||
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxoZWFkc2hvdHxlbnwwfDB8fHwxNjk1ODE3MjEzfDA&ixlib=rb-4.0.3&q=80&w=1080"
                        }
                        alt=""
                    />
                    <div className="flex flex-col">
                        <div className="md:text-justify mb-3">
                            <div className="flex flex-col mb-5">
                                <p className="text-green-600 font-bold text-xl mb-2">
                                    {username}
                                </p>
                                <button
                                    onClick={() => {
                                        setShowModal(true);
                                    }}
                                    className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                                >
                                    Смени Аватар
                                </button>
                                {modal && (
                                    <ModalAvatars
                                        onClose={avatarModalHandler}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
