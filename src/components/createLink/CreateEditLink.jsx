import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useParams } from "react-router";
import {
    useAllClass,
    useCreateLink,
    useEditLink,
} from "../../hooks/useRequestHook";
import Spinner from "../spinner/Spinner";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const initValues = {
    text: "",
    link: "",
    class: "Choose class",
    subject: "Choose a subject",
};

export default function CreateEditLink() {
    const { _id, accessToken, role } = useContext(UserContext);
    const [value, setValues] = useState(initValues);
    const [nameVisual, setNameVisual] = useState("");
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { data, isPending, error } = useAllClass(accessToken, _id);
    const { linkId, classId, subjectId } = useParams();

    useEffect(() => {
        if (!linkId) return;

        const classInfo = data?.find((cl) => cl.classId === classId); //{name: 'class1', subjects: Array(7), _id: '695255fd86a4d31dde800416', classId: '695255fd86a4d31dde80041e'}
        const subjectInfo = classInfo?.subjects.find(
            (sub) => sub._id === subjectId,
        ); //{name: 'math', links: Array(4), visualizationName: 'Математика', _id: '695255fd86a4d31dde800418'}
        const linkInfo = subjectInfo?.links.find((link) => link._id === linkId); //{text: 'abv', link: 'https://www.abv.bg/', _id: '695e58e003a854e23e47c238'}

        setNameVisual(subjectInfo?.visualizationName);
        setValues({
            text: linkInfo?.text,
            link: linkInfo?.link,
            class: classInfo?.name,
            subject: subjectInfo?.name,
        });
    }, [linkId, data]);

    const createMutation = useCreateLink(accessToken, navigate);
    const editMutatition = useEditLink(
        accessToken,
        role,
        _id,
        classId,
        subjectId,
        linkId,
        navigate,
    );

    if (isPending) {
        return <Spinner />;
    }

    if (error) {
        return toast.error(t(error.message));
    }

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const selectedClassSubject = data?.filter(
        (el) => el.name === value.class,
    )[0];

    const submitHandler = async (formData) => {
        const text = formData.get("text");
        const link = formData.get("link");
        const className = formData.get("class");
        const subject = formData.get("subject");

        const linkData = {
            text,
            link,
            subject: subject || value.subject,
            _id,
            classId: selectedClassSubject.classId,
        };

        if (linkId) {
            editMutatition.mutate(linkData);
        } else {
            createMutation.mutate(linkData);
        }
    };

    return (
        <>
            <div className="flex flex-1 flex-col items-center justify-center dark">
                <div className="w-full max-w-md bg-orange-300 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">
                        {t("createLink")}
                    </h2>
                    <form action={submitHandler} className="flex flex-col">
                        <input
                            placeholder={t("linkText")}
                            className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="text"
                            value={value.text}
                            onChange={changeHandler}
                            required
                        />

                        <input
                            placeholder="Link"
                            className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-1 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            type="text"
                            name="link"
                            value={value.link}
                            onChange={changeHandler}
                            required
                        />
                        <i className="mt-0 mb-4 text-xs text-gray-700 not-italic">
                            example: https://www.abv.bg
                        </i>
                        <select
                            className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            id="gender"
                            name="class"
                            value={value.class}
                            onChange={changeHandler}
                            disabled={linkId}
                            required
                        >
                            <option value="">{t("selectClass")}</option>
                            <option value="class1">{t("class1")}</option>
                            <option value="class2">{t("class2")}</option>
                            <option value="class3">{t("class3")}</option>
                            <option value="class4">{t("class4")}</option>
                        </select>

                        <select
                            className="bg-orange-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-orange-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            id="gender"
                            name="subject"
                            onChange={changeHandler}
                            disabled={!value.class || linkId}
                            required
                        >
                            {linkId && (
                                <option value={value.subject}>
                                    {nameVisual}
                                </option>
                            )}
                            {!linkId && !selectedClassSubject ? (
                                <option value="">{t("chooseSubject")}</option>
                            ) : (
                                selectedClassSubject?.subjects.map((sub) => (
                                    <option value={sub.name} key={sub._id}>
                                        {/* {sub.visualizationName} */}
                                        {t(sub.name)}
                                    </option>
                                ))
                            )}
                        </select>

                        <button className="bg-gradient-to-br from-green-600 to-emerald-400 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-700 hover:to-emerald-500 transition ease-in-out duration-150">
                            {linkId ? t("editLink") : t("createLink")}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
