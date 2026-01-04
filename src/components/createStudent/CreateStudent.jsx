import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router";
import { generateCode } from "../../utils/codeGenerator";
import Spinner from "../spinner/Spinner";
import Toasts from "../toasts/Toasts";
import { useAllClass, useCreateStudent } from "../../hooks/useRequestHook";

const initValues = {
    username: "",
    code: "",
    class: "Choose class",
};

export default function CreateStudent() {
    const { _id, accessToken } = useContext(UserContext);
    const [value, setValues] = useState(initValues);
    const [result, setResult] = useState(false);
    const [student, setStudent] = useState({});
    const navigate = useNavigate();

    const { data, isPending, error } = useAllClass(accessToken, _id);

    const { mutate } = useCreateStudent(accessToken, setStudent, setResult);

    if (isPending) {
        return <Spinner />;
    }

    if (error) {
        // return <Toasts message={error.message} />;
    }

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const selectedClassId = data?.filter((el) => el.name === value.class)[0];

    const submitHandler = async (formData) => {
        const code = generateCode(6);

        const username = formData.get("username");

        const newStudentData = {
            username,
            code,
            teacherId: _id,
            classId: selectedClassId?.classId,
        };

        mutate(newStudentData);

        setValues(initValues);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen dark">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">
                        Create Student
                    </h2>
                    <form action={submitHandler} className="flex flex-col">
                        <input
                            placeholder="Username"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="username"
                            value={value.username}
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

                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                            Create Student
                        </button>
                    </form>

                    {/* From Uiverse.io by themrsami */}
                    {result && (
                        <>
                            <h2 className="mt-6 text-white font-bold text-xl">
                                Student Created:
                            </h2>
                            <div className="mt-4">
                                <label className="text-white" htmlFor="title">
                                    {`Name: ${student?.username}`}
                                </label>
                            </div>
                            <div className="mt-4 flex flex-row space-x-2">
                                <label className="text-white" htmlFor="themes">
                                    {`Code: ${student?.code}`}
                                </label>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
