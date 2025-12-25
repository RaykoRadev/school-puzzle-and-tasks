export default function LogsModal({ data, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 min-w-[500px] relative">
                <button onClick={onClose} className="absolute top-2 right-2">
                    ✕
                </button>

                <ul className="space-y-2">
                    {data?.sessions.map((date, index) => (
                        <li key={index} className="p-2 bg-gray-100 rounded">
                            {date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
