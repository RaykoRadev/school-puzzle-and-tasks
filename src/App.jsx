import { Route, Routes } from "react-router";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import TeacherPage from "./components/teacherPage/TeacherPage";
import UserProvider from "./provider/UserProvider";
import CreateEditStudent from "./components/createEditStudent/CreateEditStudent";
import Dashboard from "./components/teacherPage/dashboard/Dashboard";
import StudentsList from "./components/teacherPage/studentsList/StudentsList";
import Class from "./components/class/Class";
import LinksList from "./components/class/linksList/LinksList";
import Spinner from "./components/spinner/Spinner";
import StudentsProfile from "./components/studentsProfile/StudentsProfile";
import AllClasses from "./components/allClasses/AllClasses";
import IsGuest from "./guards/isGuest/IsGuest";
import IsAuthenticated from "./guards/isAuthenticated/IsAuthenticated";
import IsTeacher from "./guards/isTeacher/IsTeacher";
import IsStudent from "./guards/isStudent/IsStudent";
import CreateEditLink from "./components/createLink/CreateEditLink";

function App() {
    return (
        <UserProvider>
            <div className="min-h-screen flex flex-col bg-transperant">
                <Navigation />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/spinner" element={<Spinner />} />

                    {/* student */}
                    <Route element={<IsStudent />}>
                        <Route
                            path="/student-profile"
                            element={<StudentsProfile />}
                        />
                    </Route>

                    {/* guests */}
                    <Route element={<IsGuest />}>
                        <Route path="/student/login" element={<Login />} />
                        <Route path="/teacher/login" element={<Login />} />
                    </Route>

                    {/* teacher */}
                    <Route element={<IsTeacher />}>
                        <Route
                            path="/teacher/dashboard"
                            element={<TeacherPage />}
                        >
                            <Route
                                path="students-list"
                                element={<StudentsList />}
                            />
                            <Route index element={<Dashboard />} />
                        </Route>
                        <Route
                            path="/teacher/create-link"
                            element={<CreateEditLink />}
                        />
                        <Route
                            path="/:classId/:subjectId/:linkId/edit"
                            element={<CreateEditLink />}
                        />
                        <Route
                            path="/:teacherId/:studentId/edit"
                            element={<CreateEditStudent />}
                        />
                        <Route
                            path="/:teacherId/allClasses"
                            element={<AllClasses />}
                        />
                        <Route
                            path="/teacher/create-student"
                            element={<CreateEditStudent />}
                        />
                    </Route>

                    {/* teacher and student */}
                    <Route element={<IsAuthenticated />}>
                        <Route
                            path="/links/:teacherId/:classId"
                            element={<Class />}
                        >
                            <Route path=":subjectId" element={<LinksList />} />
                        </Route>
                    </Route>
                </Routes>
                <footer className="bg-transperant p-4 text-center text-sm text-gray-700 bg-orange-100 backdrop-blur-md">
                    © 2026 All rights reserved. Created by{" "}
                    <a
                        href="https://www.facebook.com/christmas898/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Rayko Radev
                    </a>
                    . Contact: rayko_radev@yahoo.com
                </footer>
            </div>
        </UserProvider>
    );
}

export default App;
