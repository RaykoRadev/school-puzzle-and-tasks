import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { endPoints, host } from "../config/constants";
import fetchRequest from "../api/apiCalls";

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
