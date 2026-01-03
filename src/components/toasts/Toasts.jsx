export default function Toasts({ message }) {
    // console.log("the error is: ", error);

    return (
        <div className="space-y-6 grid justify-center mt-4">
            <div
                className="bg-green-50 border border-gray-300 border-l-[6px] border-l-green-600 flex items-start w-full min-w-xs max-w-lg p-4 rounded-md"
                role="alert"
            >
                <div className="mr-3 shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 fill-green-600 inline"
                        viewBox="0 0 512 512"
                    >
                        <ellipse
                            cx={246}
                            cy={246}
                            data-original="#000"
                            rx={246}
                            ry={246}
                        />
                        <path
                            className="fill-white"
                            d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
                            data-original="#000"
                        />
                    </svg>
                </div>
                <div>
                    <h6 className="text-green-600 text-[15px] font-semibold tracking-wide">
                        Action completed successfully
                    </h6>
                    <p className="text-sm text-slate-600 mt-0.5">
                        Your action was processed without issues.
                    </p>
                </div>
                <button
                    type="button"
                    className="cursor-pointer border-0 outline-0 ml-auto"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 cursor-pointer shrink-0 fill-gray-500 hover:fill-red-500"
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
                </button>
            </div>

            <div
                className="bg-red-50 border border-gray-300 border-l-[6px] border-l-red-600 flex items-start w-full min-w-xs max-w-lg p-4 rounded-md"
                role="alert"
            >
                <div className="mr-3 shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 fill-red-600 inline"
                        viewBox="0 0 32 32"
                    >
                        <path
                            d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1zm6.36 20L21 22.36l-5-4.95-4.95 4.95L9.64 21l4.95-5-4.95-4.95 1.41-1.41L16 14.59l5-4.95 1.41 1.41-5 4.95z"
                            data-original="#ea2d3f"
                        />
                    </svg>
                </div>
                <div>
                    <h6 className="text-red-600 text-[15px] font-semibold tracking-wide">
                        {message}
                    </h6>
                    <p className="text-sm text-slate-600 mt-0.5">
                        We couldn’t complete your request. Please try again.
                    </p>
                </div>
                <button
                    type="button"
                    className="cursor-pointer border-0 outline-0 ml-auto"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 cursor-pointer shrink-0 fill-gray-500 hover:fill-red-500"
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
                </button>
            </div>
        </div>
    );
}
