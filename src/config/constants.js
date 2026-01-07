export const host = import.meta.env.VITE_API_URL;

export const endPoints = {
    login: "/login",
    logout: "/logout",

    getAllClasses: "/links/getAllClasses",
    getOneClass: "/links/getOneClass",

    getAllStudents: "/links/getAllStudents",

    createLink: "/links/createLink",
    link: "/links",

    registerStudent: "/student/register",
    student: "/student",
};
