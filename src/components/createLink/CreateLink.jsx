import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import useRequest from "../../hooks/useRequester";
import { endPoints, host } from "../../config/constants";

//! abort controller probably dosnt work ???????????????????????????????

const initValues = {
    username: "",
    code: "",
    class: "Choose class",
    subject: "Choose a subject",
};

export default function CreateLink() {
    const { _id, accessToken } = useContext(UserContext);
    const [value, setValues] = useState(initValues);

    // todo the requst is working in the responce tab in the broser has asked data, but in the console shows empty array
    const { data } = useRequest(host + endPoints.getAllDAta, []);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
        console.log(e.target.value);
    };

    const classSubjects = data.filter((el) => el.name === value.class);
    console.log(accessToken);
    console.log(classSubjects);
    console.log("data: ", data);

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
                            value={value.username}
                            onChange={changeHandler}
                        />

                        <input
                            placeholder="Link"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="Link"
                            value={value.link}
                            onChange={changeHandler}
                        />

                        <select
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            id="gender"
                            name="class"
                            value={value.class}
                            onChange={changeHandler}
                        >
                            <option value="">Select a class</option>
                            <option value="class1">Class 1</option>
                            <option value="class2">Class 2</option>
                            <option value="class3">Class 3</option>
                            <option value="class4">Class 4</option>
                        </select>

                        <select
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            id="gender"
                            name="subject"
                            onChange={changeHandler}
                        >
                            {/*todo  first to make controlled form and after selecting class to sort only the subjects included in that class */}
                            {classSubjects.length === 0 ? (
                                <option value="">Choose a Class</option>
                            ) : (
                                classSubjects[0].subjects.map((sub) => (
                                    <option value={sub.name} key={sub._id}>
                                        {sub.name}
                                    </option>
                                ))
                            )}
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
