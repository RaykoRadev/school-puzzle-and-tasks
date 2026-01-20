import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endPoints, host } from "../config/constants";
import fetchRequest from "../api/apiCalls";
import revertObject from "../utils/revertObject";
import { toast } from "sonner";
import i18n from "../i18n";

export const useStudentsList = (accessToken) =>
    useQuery({
        queryKey: ["studenstList"],
        queryFn: async ({ signal }) =>
            fetchRequest(
                host + endPoints.getAllStudents,
                "GET",
                signal,
                accessToken,
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
                accessToken,
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
                accessToken,
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
                data,
            ),
        onSuccess: (result) => {
            toast.success(`${i18n.t("toastWelcome")} ${result.username}`);
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
            toast.error(i18n.t("invalidCredentional"));
            navigate(`/${role}/login`);
        },
    });

export const useLogout = (
    role,
    removeLocalStorageData,
    accessToken,
    navigate,
) =>
    useMutation({
        mutationFn: () =>
            fetchRequest(
                host + "/" + role + endPoints.logout,
                "GET",
                null,
                accessToken,
            ),
        onSuccess: (result) => {
            toast.success(i18n.t("sucLogout"));
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
                data,
            ),
        onSuccess: () => {
            toast.success(i18n.t("sucCreatedLink"));
            navigate("/teacher/dashboard");
        },
        onError: () => {
            toast.error(i18n.t("sthWentWrong"));
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
                accessToken,
            );
        },
        onSuccess: () => {
            // navigate(-1);
            toast.success(i18n.t("sucDelLink"));
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
                accessToken,
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
    navigate,
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
                data,
            ),
        onSuccess: () => {
            toast.success(i18n.t("sucEditLink"));
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
                data,
            ),
        onSuccess: (result) => {
            toast.success(i18n.t("sucRegStudent"));
            (setResult(true), setStudent(result));
        },
        onError: (err) => {
            toast.error(i18n.t(err.message) || i18n.t("sthWentWrong"));
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
                accessToken,
            );
        },
        onSuccess: () => {
            // navigate(-1);
            toast.success(i18n.t("sucDelStudent"));
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
                accessToken,
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
    navigate,
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
                data,
            );
        },
        onSuccess: (result) => {
            navigate(-1);
            toast.success(i18n.t("sucEditStudent"));
            (setResult(true), setStudent(result));
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["studenstList"] });
        },
    });
};

export const useAllAvatars = () =>
    useQuery({
        queryKey: ["Avatars"],
        queryFn: async ({ signal }) =>
            fetchRequest(host + endPoints.avatars, "GET", signal),
        staleTime: Infinity,
    });

export const useUpdateAvatar = (
    accessToken,
    role,
    studentId,
    setLocalStorageData,
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            fetchRequest(
                host + endPoints.editAvatar + "/" + studentId + "/edit",
                "PATCH",
                null,
                accessToken,
                data,
            ),
        onSuccess: (result) => {
            toast.success(i18n.t("sucEditAvatar"));
            queryClient.invalidateQueries({
                queryKey: ["singleSudent", role, studentId],
            });
            setLocalStorageData({
                _id: result._id,
                accessToken: accessToken,
                avatar: result.avatar,
                classId: result.classId,
                role: result.role,
                teacherId: result.teacherId,
                username: result.username,
            });
        },
    });
};

export const useCodeEdit = (accessToken, navigate) =>
    useMutation({
        mutationFn: (data) =>
            fetchRequest(
                host + endPoints.editCode,
                "PATCH",
                null,
                accessToken,
                data,
            ),
        onSuccess: () => {
            toast.success(i18n.t.$TFunctionBrand("sucEditCode"));

            navigate(-1);
        },
        onError: (err) => {
            toast.error(i18n.t(err.message));
        },
    });
