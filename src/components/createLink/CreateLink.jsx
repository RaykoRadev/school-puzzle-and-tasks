import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { endPoints, host } from "../../config/constants";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAllClass } from "../../hooks/useRequestHook";
import Toasts from "../toasts/Toasts";
import Spinner from "../spinner/Spinner";

const initValues = {
    text: "",
    link: "",
    class: "Choose class",
    subject: "Choose a subject",
};

export default function CreateLink() {
    const { _id, accessToken } = useContext(UserContext);
    const [value, setValues] = useState(initValues);
    const navigate = useNavigate();

    const { data, isPending, error } = useAllClass(accessToken, _id);

    if (isPending) {
        return <Spinner />;
    }

    if (error) {
        return <Toasts message={error.message} />;
    }

    const { mutate } = useMutation({
        mutationFn: async (data) => {
            const res = await fetch(host + endPoints.createLink, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": accessToken,
                },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            navigate("/teacher/dashboard");
        },
    });

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const selectedClassSubject = data?.filter(
        (el) => el.name === value.class
    )[0];
    console.log(accessToken);

    const submitHandler = async (formData) => {
        const text = formData.get("text");
        const link = formData.get("link");
        const className = formData.get("class");
        const subject = formData.get("subject");

        const linkData = {
            text,
            link,
            // class: className,  // shouldnt be needed
            subject,
            _id,
            classId: selectedClassSubject.classId,
        };

        mutate(linkData);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen dark">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">
                        Create Link
                    </h2>
                    <form action={submitHandler} className="flex flex-col">
                        <input
                            placeholder="Text"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="text"
                            value={value.text}
                            onChange={changeHandler}
                        />

                        <input
                            placeholder="Link"
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-1 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="link"
                            value={value.link}
                            onChange={changeHandler}
                        />
                        <i className="mt-0 mb-4 text-xs text-gray-400 not-italic">
                            example: https://www.abv.bg
                        </i>
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
                            disabled={!value.class}
                        >
                            {!selectedClassSubject ? (
                                <option value="">Choose a Class</option>
                            ) : (
                                selectedClassSubject.subjects.map((sub) => (
                                    <option value={sub.name} key={sub._id}>
                                        {sub.visualizationName}
                                    </option>
                                ))
                            )}
                        </select>

                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                            Create Link
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
