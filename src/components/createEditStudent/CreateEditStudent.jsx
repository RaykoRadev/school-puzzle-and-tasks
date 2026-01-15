import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useParams } from "react-router";
import { generateCode } from "../../utils/codeGenerator";
import Spinner from "../spinner/Spinner";
import {
    useAllClass,
    useCreateStudent,
    useEditStudent,
    useOneStudent,
} from "../../hooks/useRequestHook";
import { toast } from "sonner";

const initValues = {
    username: "",
    code: "",
    class: "Choose class",
};

export default function CreateEditStudent() {
    const { _id, accessToken, role, classesIds } = useContext(UserContext);
    const [value, setValues] = useState(initValues);
    const [result, setResult] = useState(false);
    const [student, setStudent] = useState({});
    const navigate = useNavigate();

    const { data, isPending, error } = useAllClass(accessToken, _id);

    const { studentId } = useParams();

    const oldStudentInfo = useOneStudent(accessToken, role, _id, studentId);

    useEffect(() => {
        if (!studentId) return;
        if (!oldStudentInfo.data) return;

        const oldStudent = data?.find(
            (st) => st.classId === oldStudentInfo?.data?.classId
        );

        setValues({
            username: oldStudentInfo?.data?.username,
            code: oldStudentInfo?.data?.code,
            class: oldStudent?.name,
        });
    }, [studentId, oldStudentInfo.data]);

    const createMutation = useCreateStudent(accessToken, setStudent, setResult);
    const editMutauon = useEditStudent(
        accessToken,
        _id,
        studentId,
        setStudent,
        setResult,
        navigate
    );

    if (isPending) {
        return <Spinner />;
    }

    if (error) {
        return toast.error(error.message);
    }

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const selectedClassId = data?.filter((el) => el.name === value.class)[0];

    const generator = () => {
        const newCode = generateCode(6);
        setValues((prev) => ({ ...prev, code: newCode }));
    };

    const submitHandler = async (formData) => {
        const username = formData.get("username");

        if (studentId) {
            const code = formData.get("code");

            editMutauon.mutate({
                username,
                code,
                classId: selectedClassId?.classId,
            });
        } else {
            const code = generateCode(6);

            const newStudentData = {
                username,
                code,
                teacherId: _id,
                classId: selectedClassId?.classId,
            };

            createMutation.mutate(newStudentData);
        }

        setValues(initValues);
    };

    return (
        <>
            <div className="flex flex-1 flex-col items-center justify-center dark">
                <div className="w-full max-w-md bg-orange-300 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">
                        Create Student
                    </h2>
                    <form action={submitHandler} className="flex flex-col">
                        <input
                            placeholder="Username"
                            className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="username"
                            value={value.username}
                            onChange={changeHandler}
                        />
                        {value.code && (
                            <div className="flex gap-2 w-full">
                                <input
                                    placeholder="Code"
                                    className="flex-1 bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    type="text"
                                    name="code"
                                    value={value.code}
                                    onChange={changeHandler}
                                />
                                <button
                                    type="button"
                                    onClick={generator}
                                    className="bg-gradient-to-br from-green-600 to-emerald-400 text-white font-bold py-2 px-4 rounded-md p-2 mb-4 hover:bg-green-700 hover:to-emerald-500 transition ease-in-out duration-150"
                                >
                                    Generate Code
                                </button>
                            </div>
                        )}
                        <select
                            className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
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

                        <button className="bg-gradient-to-br from-green-600 to-emerald-400 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-700 hover:to-emerald-500 transition ease-in-out duration-150">
                            {studentId ? "Edit student" : "Create student"}
                        </button>
                    </form>

                    {/* From Uiverse.io by themrsami */}
                    {result && (
                        <>
                            <h2 className="mt-6 text-green-600 font-bold text-xl">
                                Student Created:
                            </h2>
                            <div className="mt-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="title"
                                >
                                    {`Name: ${student?.username}`}
                                </label>
                            </div>
                            <div className="mt-4 flex flex-row space-x-2">
                                <label
                                    className="text-gray-800"
                                    htmlFor="themes"
                                >
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
