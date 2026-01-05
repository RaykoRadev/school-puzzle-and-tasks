import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function StudentsProfile() {
    const { username } = useContext(UserContext);
    return (
        <section className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full md:w-1/2 md:mx-auto flex flex-col md:flex-row items-center justify-center text-center">
                <div className="backdrop-blur-md, border-2 border-emerald-400 rounded-lg flex flex-col md:flex-row items-center justify-center p-3">
                    <img
                        className="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-indigo-600/100 bg-indigo-50 h-24 w-24 !h-32 !w-32 mb-4 md:mb-0 ml-0 md:mr-5"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxoZWFkc2hvdHxlbnwwfDB8fHwxNjk1ODE3MjEzfDA&ixlib=rb-4.0.3&q=80&w=1080"
                        alt=""
                    />
                    <div className="flex flex-col">
                        <div className="md:text-justify mb-3">
                            <div className="flex flex-col mb-5">
                                <p className="text-white font-bold text-xl">
                                    {username}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
