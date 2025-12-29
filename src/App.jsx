import { Route, Routes } from "react-router";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import TeacherPage from "./components/teacherPage/TeacherPage";
import UserProvider from "./provider/UserProvider";
import CreateLink from "./components/createLink/CreateLink";
import CreateStudent from "./components/createStudent/CreateStudent";
import Dashboard from "./components/teacherPage/dashboard/Dashboard";
import StudentsList from "./components/teacherPage/studentsList/StudentsList";
import Profile from "./components/teacherPage/profile/Profile";
import Class from "./components/class/Class";
import LinksList from "./components/class/linksList/LinksList";

function App() {
    return (
        <UserProvider>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/student/login" element={<Login />} />
                <Route path="/teacher/login" element={<Login />} />
                <Route path="/teacher/dashboard" element={<TeacherPage />}>
                    <Route path="students-list" element={<StudentsList />} />
                    <Route path="profile" element={<Profile />} />
                    <Route index element={<Dashboard />} />
                </Route>
                <Route path="/teacher/create-link" element={<CreateLink />} />
                <Route
                    path="/teacher/create-student"
                    element={<CreateStudent />}
                />
                <Route path="/links/:teacherId/:classId" element={<Class />}>
                    <Route path=":subjectId" element={<LinksList />} />
                </Route>
            </Routes>
        </UserProvider>
    );
}

export default App;
