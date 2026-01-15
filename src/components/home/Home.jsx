export default function Home() {
    return (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-10">
            <div className="max-w-screen-xl w-full">
                <div className="max-w-4xl mx-auto text-center">
                    {/* <h1 className="text-slate-900 text-4xl md:text-5xl font-bold leading-tight"> */}
                    <h1
                        style={{
                            fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        }}
                        className="text-slate-900 font-bold leading-tight text-2xl sm:text-3xl md:text-3xl md:ml-11 lg:text-5xl lg:ml-11"
                    >
                        <p>Добре дошли в страничката за</p>
                        <p>успешни деца на г-жа Долапчиева</p>
                    </h1>
                </div>
            </div>
        </div>
    );
}
