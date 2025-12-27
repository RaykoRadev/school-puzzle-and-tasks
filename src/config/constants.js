export const host = import.meta.env.VITE_API_URL;

export const endPoints = {
    login: "/login",
    logout: "/logout",

    getAllClasses: "/links/getAllClasses",
    getOneClass: "/links/getOneClass",

    createLink: "/links/createLink",

    registerStudent: "/student/register",
    getAllStudents: "/links/getAllStudents",
};
