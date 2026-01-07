import { useContext, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import { UserContext } from "../../../context/userContext";
import DeleteModal from "../../deleteModal/DeleteModal";

export default function LinksList() {
    const { role } = useContext(UserContext);
    const [modal, setShowModal] = useState(false);
    const { subjects } = useOutletContext();
    const { subjectId, classId } = useParams();

    const subject = subjects?.find((sub) => sub._id === subjectId);

    if (!subject) {
        return <p className="text-red-500">Subject not found</p>;
    }

    const deleteModalHandler = () => {
        setShowModal(false);
    };

    console.log(subject.links);

    return (
        <div className="py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-w-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-4">
                {subject.links.map((link) => (
                    <div
                        key={link._id}
                        className="bg-gray-100 rounded-lg group overflow-hidden relative lg:hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all before:pointer-events-none"
                    >
                        <a
                            href={link.link}
                            target="_blank"
                            className="block w-full p-1"
                        >
                            <div className="w-full aspect-[3/1] flex items-center justify-center">
                                <span className="text-lg font-medium text-center leading-tight">
                                    {link.text}
                                </span>
                            </div>
                        </a>
                        {role === "teacher" && (
                            <div
                                className="absolute bottom-2 left-0 right-0
      flex justify-center gap-6
      opacity-0 pointer-events-none
      group-hover:opacity-100 group-hover:pointer-events-auto
      transition-opacity duration-200"
                            >
                                <div className="flex gap-2 text-gray-600 duration-200 hover:cursor-pointer">
                                    <Link to={``}>
                                        <button className="font-semibold text-sm text-green-700">
                                            <svg
                                                className="w-5 stroke-green-700 transition-transform hover:scale-110"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                                <div className="flex gap-2 text-gray-600 duration-200 hover:cursor-pointer">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="font-semibold text-sm text-red-700"
                                    >
                                        <svg
                                            className="w-5 stroke-red-700 transition-transform hover:scale-110"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            <line
                                                x1={10}
                                                y1={11}
                                                x2={10}
                                                y2={17}
                                            />
                                            <line
                                                x1={14}
                                                y1={11}
                                                x2={14}
                                                y2={17}
                                            />
                                        </svg>
                                    </button>
                                    {modal && (
                                        <DeleteModal
                                            onClose={deleteModalHandler}
                                            itemId={link._id}
                                            itemType="link"
                                            classId={classId}
                                            subjectId={subjectId}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
