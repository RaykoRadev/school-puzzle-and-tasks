export default function LogsModal({ data, onClose }) {
    return (
        <div className="backdrop" onClick={onClose}>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-orange-200 rounded-lg p-4 min-w-[300px] relative">
                    <h1 className="mb-3 font-bold">Last 10 logs</h1>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2"
                    >
                        ✕
                    </button>
                    {/* //todo find a way to use it with an Object; maybe with a ternaren operator???? */}
                    <ul className="space-y-2">
                        {data?.sessions.map((date, index) => (
                            <li
                                key={index}
                                className="p-2 bg-orange-100 rounded"
                            >
                                {date}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
