import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endPoints, host } from "../config/constants";
import fetchRequest from "../api/apiCalls";
import revertObject from "../utils/revertObject";
import { toast } from "sonner";

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
        queryKey: ["singleClass", role, classId],
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
            toast.success(`Добре дошъл/а ${result.username}`);
            if (role === "teacher") {
                const orgClassNameObj = result.classesIds;
                const reveretedClassNameObj = revertObject(orgClassNameObj);
                result.classesIds = reveretedClassNameObj;
            }
            setLocalStorageData(result);
            if (role === "teacher") {
                return navigate(`/${result._id}/allClasses`);
            }
            navigate(`/links/${result.teacherId}/${result.classId}`);
        },
        onError: (err) => {
            toast.error("invalid username or code");
            navigate(`/${role}/login`);
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
            toast.success("Успешно отписване!");
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
            toast.success("Успешно създаване на линк!");
            navigate("/teacher/dashboard");
        },
        onError: () => {
            toast.error("Нещо се обърка. Моля пробвайте отново.");
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ["classInfo"] }),
    });
};

export const useDeleteLink = (accessToken, classId, subjectId, linkId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            fetchRequest(
                host +
                    endPoints.link +
                    "/" +
                    classId +
                    "/" +
                    subjectId +
                    "/" +
                    linkId +
                    "/delete",
                "DELETE",
                null,
                accessToken
            );
        },
        onSuccess: () => {
            // navigate(-1);
            toast.success("Успешно изтрит линк!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["singleClass"] });
        },
    });
};

export const useOneLink = (accessToken, role, classId, subjectId, linkId) =>
    useQuery({
        queryKey: ["singleLink", role, linkId],
        queryFn: ({ signal }) =>
            fetchRequest(
                host +
                    endPoints.link +
                    "/getOneLink/" +
                    classId +
                    "/" +
                    subjectId +
                    "/" +
                    linkId,
                "GET",
                signal,
                accessToken
            ),
        enabled: !!linkId,
        staleTime: role === "teacher" ? 0 : 1000 * 60 * 30,
    });

export const useEditLink = (
    accessToken,
    role,
    teacherId,
    classId,
    subjectId,
    linkId,
    navigate
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchRequest(
                host +
                    endPoints.link +
                    "/" +
                    classId +
                    "/" +
                    subjectId +
                    "/" +
                    linkId +
                    "/edit",
                "PUT",
                null,
                accessToken,
                data
            ),
        onSuccess: () => {
            toast.success("Успешно променен линк!");
            navigate(`/links/${teacherId}/${classId}/${subjectId}`);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["singleClass", role, classId],
            });
        },
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
            toast.success("Успешно регистриране на ученик!");
            setResult(true), setStudent(result);
        },
        onError: (err) => {
            toast.error(
                err.message || "Нещо се обърка. Моля пробвайте отново."
            );
        },
        // onSettled: () =>
        //     queryClient.invalidateQueries({ queryKey: ["classInfo"] }),
    });
};

export const useDeleteStudent = (accessToken, teacherId, studentId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            fetchRequest(
                host +
                    endPoints.student +
                    "/" +
                    teacherId +
                    "/" +
                    studentId +
                    "/delete",
                "DELETE",
                null,
                accessToken
            );
        },
        onSuccess: () => {
            // navigate(-1);
            toast.success("Успешно изтрит студент!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["studenstList"] });
        },
    });
};

export const useOneStudent = (accessToken, role, teacherId, studentId) =>
    useQuery({
        queryKey: ["singleSudent", role, studentId],
        queryFn: async ({ signal }) =>
            fetchRequest(
                host + endPoints.student + "/" + teacherId + "/" + studentId,
                "GET",
                signal,
                accessToken
            ),
        enabled: !!studentId,
        staleTime: role === "teacher" ? 0 : 1000 * 60 * 30, // that should make always new req for a theacher and one req per 30 min for student
    });

export const useEditStudent = (
    accessToken,
    teacherId,
    studentId,
    setStudent,
    setResult,
    navigate
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            fetchRequest(
                host +
                    endPoints.student +
                    "/" +
                    teacherId +
                    "/" +
                    studentId +
                    "/edit",
                "PATCH",
                null,
                accessToken,
                data
            );
        },
        onSuccess: (result) => {
            navigate(-1);
            toast.success("Успешно променен студент!");
            setResult(true), setStudent(result);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["studenstList"] });
        },
    });
};
