import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endPoints, host } from "../config/constants";
import fetchRequest from "../api/apiCalls";
import revertObject from "../utils/revertObject";

export const useStudentsList = (accessToken) =>
    useQuery({
        queryKey: ["studenstList"],
        queryFn: async ({ signal }) =>
            fetchRequest(
                host + endPoints.getAllStudents,
                "GET",
                signal,
                accessToken
            ),
    });

export const useOneClass = (accessToken, role, teacherId, classId) =>
    useQuery({
        queryKey: ["singleClass", role],
        queryFn: async ({ signal }) =>
            fetchRequest(
                host + endPoints.getOneClass + "/" + teacherId + "/" + classId,
                "GET",
                signal,
                accessToken
            ),
        staleTime: role === "teacher" ? 0 : 1000 * 60 * 30, // that should make always new req for a theacher and one req per 30 min for student
    });

export const useAllClass = (accessToken, teacherId) =>
    useQuery({
        queryKey: ["classInfo"],
        queryFn: async ({ signal }) =>
            fetchRequest(
                host + endPoints.getAllClasses + "/" + teacherId,
                "GET",
                signal,
                accessToken
            ),
        staleTime: 1000 * 60 * 30,
    });

export const useLogin = (role, setLocalStorageData, navigate) =>
    useMutation({
        mutationFn: (data) =>
            fetchRequest(
                host + "/" + role + "/login",
                "POST",
                null,
                null,
                data
            ),
        onSuccess: (result) => {
            if (role === "teacher") {
                const orgClassNameObj = result.classesIds;
                const reveretedClassNameObj = revertObject(orgClassNameObj);
                result.classesIds = reveretedClassNameObj;
            }
            setLocalStorageData(result);
            if (role === "teacher") {
                return navigate("/");
            }
            navigate(`/links/${result.teacherId}/${result.classId}`);
        },
    });

export const useLogout = (
    role,
    removeLocalStorageData,
    accessToken,
    navigate
) =>
    useMutation({
        mutationFn: () =>
            fetchRequest(
                host + "/" + role + endPoints.logout,
                "GET",
                null,
                accessToken
            ),
        onSuccess: (result) => {
            removeLocalStorageData(result);
            navigate("/");
        },
    });

export const useCreateLink = (accessToken, navigate) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchRequest(
                host + endPoints.createLink,
                "POST",
                null,
                accessToken,
                data
            ),
        onSuccess: () => {
            navigate("/teacher/dashboard");
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ["classInfo"] }),
    });
};

export const useCreateStudent = (accessToken, setStudent, setResult) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchRequest(
                host + endPoints.registerStudent,
                "POST",
                null,
                accessToken,
                data
            ),
        onSuccess: (result) => {
            setResult(true), setStudent(result);
        },
        // onSettled: () =>
        //     queryClient.invalidateQueries({ queryKey: ["classInfo"] }),
    });
};
