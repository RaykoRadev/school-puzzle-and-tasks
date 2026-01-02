import { useOutletContext, useParams } from "react-router";

export default function LinksList() {
    const { subjects } = useOutletContext();
    const { subjectId } = useParams();

    const subject = subjects?.find((sub) => sub._id === subjectId);

    if (!subject) {
        return <p className="text-red-500">Subject not found</p>;
    }

    return (
        <div className="py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-w-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-4">
                {subject.links.map((link) => (
                    <div
                        key={link.text}
                        className="bg-gray-100 rounded-lg group overflow-hidden relative
             lg:hover:before:bg-black before:absolute before:inset-0
             before:opacity-20 before:transition-all before:pointer-events-none"
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
                    </div>
                ))}
            </div>
        </div>
    );
}
