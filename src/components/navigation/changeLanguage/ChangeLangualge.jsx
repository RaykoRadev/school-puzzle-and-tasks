import { useTranslation } from "react-i18next";

const ChangeLanguage = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
        localStorage.setItem("lang", newLang);
    };

    return (
        <select
            value={i18n.language}
            onChange={handleLanguageChange}
            className=" h-[28px] px-2 text-sm bg-orange-100 rounded border-2 border-green-600 appearance-none leading-none1 focus:outline-none focus:ring--green-700"
        >
            <option value="bg">БГ</option>
            <option value="en">EN</option>
        </select>
    );
};

export default ChangeLanguage;
