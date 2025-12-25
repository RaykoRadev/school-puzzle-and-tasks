import { useOutletContext, useParams } from "react-router";

export default function LinksList() {
    const { subjects } = useOutletContext();
    const { subjectId } = useParams();

    const subject = subjects?.find((sub) => sub._id === subjectId);

    if (!subject) {
        return <p className="text-red-500">Subject not found</p>;
    }

    return (
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 p-4">
            <div className="p-2 sm:w-1/2 w-full">
                {subject.links.map((link) => (
                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                            <path d="M22 4L12 14.01l-3-3" />
                        </svg>
                        <span className="font-medium">{link.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
