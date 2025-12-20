import { Link } from "react-router";

export default function Home() {
    return (
        <>
            {/* source: https://redpixelthemes.com/ */}
            <div className="container relative z-40 mx-auto h-screen flex items-center justify-center">
                <div className="flex flex-wrap justify-center mx-auto lg:w-full md:w-5/6 xl:shadow-small-blue">
                    <Link
                        to="#"
                        className="block w-1/2 py-10 text-center border lg:w-1/2"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center h-full md:gap-4">
                            <img
                                src="https://redpixelthemes.com/assets/images/icon-portfolio-green.svg"
                                className="block mx-auto md:mx-0"
                            />
                            <p className="pt-4 md:pt-0 text-sm font-medium capitalize font-body text-green-500 lg:text-lg md:text-base">
                                Първи Клас
                            </p>
                        </div>
                    </Link>
                    <Link
                        to="#"
                        className="block w-1/2 py-10 text-center border lg:w-1/2"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center h-full md:gap-4">
                            <img
                                src="https://redpixelthemes.com/assets/images/icon-blog-green.svg"
                                className="block mx-auto md:mx-0"
                            />
                            <p className="pt-4 md:pt-0 text-sm font-medium capitalize font-body text-green-500 lg:text-lg md:text-base">
                                Втори Клас
                            </p>
                        </div>
                    </Link>
                    <Link
                        to="#"
                        className="block w-1/2 py-10 text-center border lg:w-1/2"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center h-full md:gap-4">
                            <img
                                src="https://redpixelthemes.com/assets/images/icon-ecommerce-green.svg"
                                className="block mx-auto md:mx-0"
                            />
                            <p className="pt-4 md:pt-0 text-sm font-medium capitalize font-body text-green-500 lg:text-lg md:text-base">
                                Трети Клас
                            </p>
                        </div>
                    </Link>
                    <Link
                        to="#"
                        className="block w-1/2 py-10 text-center border lg:w-1/2"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center h-full md:gap-4">
                            <img
                                src="https://redpixelthemes.com/assets/images/icon-startup-green.svg"
                                className="block mx-auto md:mx-0"
                            />
                            <p className="pt-4 md:pt-0 text-sm font-medium capitalize font-body text-green-500 lg:text-lg md:text-base">
                                Четвърти Клас
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
