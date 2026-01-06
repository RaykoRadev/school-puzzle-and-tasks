import { Route, Routes } from "react-router";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import TeacherPage from "./components/teacherPage/TeacherPage";
import UserProvider from "./provider/UserProvider";
import CreateLink from "./components/createLink/CreateLink";
import CreateEditStudent from "./components/createEditStudent/CreateEditStudent";
import Dashboard from "./components/teacherPage/dashboard/Dashboard";
import StudentsList from "./components/teacherPage/studentsList/StudentsList";
import Profile from "./components/teacherPage/profile/Profile";
import Class from "./components/class/Class";
import LinksList from "./components/class/linksList/LinksList";
import Spinner from "./components/spinner/Spinner";
import StudentsProfile from "./components/studentsProfile/StudentsProfile";
import AllClasses from "./components/allClasses/AllClasses";
import IsGuest from "./guards/isGuest/IsGuest";
import IsAuthenticated from "./guards/isAuthenticated/IsAuthenticated";
import IsTeacher from "./guards/isTeacher/IsTeacher";
import IsStudent from "./guards/isStudent/IsStudent";

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
                            <Route path="profile" element={<Profile />} />
                            <Route index element={<Dashboard />} />
                        </Route>
                        <Route
                            path="/teacher/create-link"
                            element={<CreateLink />}
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
            </div>
        </UserProvider>
    );
}

export default App;
