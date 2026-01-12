import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import ModalAvatars from "./ModalAvatars";

export default function StudentsProfile() {
    const { username, avatar } = useContext(UserContext);
    const [modal, setShowModal] = useState(false);

    const avatarModalHandler = () => {
        setShowModal(false);
    };
    return (
        <section className="flex-1 flex items-center justify-center p-4">
            <div className="w-full md:w-1/2 md:mx-auto flex flex-col md:flex-row items-center justify-center text-center">
                <div className="bg-orange-200 border-2 border-emerald-400 rounded-lg flex flex-col md:flex-row items-center justify-center px-14 py-7">
                    <img
                        className="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-indigo-600/100 bg-indigo-50 h-24 w-24 !h-32 !w-32 mb-4 md:mb-0 ml-0 md:mr-5"
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
