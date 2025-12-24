import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import useRequest from "../../hooks/useRequester";
import { endPoints, host } from "../../config/constants";

//! abort controller probably dosnt work ???????????????????????????????

export default function CreateLink() {
    const { _id, accessToken } = useContext(UserContext);

    // todo the requst is working in the responce tab in the broser has asked data, but in the console shows empty array
    const { data } = useRequest(host + endPoints.getAllDAta, []);

    console.log(accessToken);
    console.log(data);

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen dark">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">
                        Create Link
                    </h2>
                    <form className="flex flex-col">
                        <input
                            placeholder="Username"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="username"
                        />

                        <input
                            placeholder="Link"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="Link"
                        />

                        <select
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            id="gender"
                        >
                            {/* <option value="">-- Select a class --</option> */}
                            <option value="class1">Class 1</option>
                            <option value="class2">Class 2</option>
                            <option value="class3">Class 3</option>
                            <option value="class4">Class 4</option>
                        </select>

                        <select
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            id="gender"
                        >
                            {/*todo  first to make controlled form and after selecting class to sort only the subjects included in that class */}
                            <option value="">-- Select a subject --</option>
                            <option value="subject">subject</option>
                        </select>

                        <button
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            // type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
