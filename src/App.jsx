import { Route, Routes } from "react-router";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import TeacherPage from "./components/teacherPage/TeacherPage";
import UserProvider from "./provider/UserProvider";
import CreateLink from "./components/createLink/CreateLink";

function App() {
    return (
        <UserProvider>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/student/login" element={<Login />} />
                <Route path="/teacher/login" element={<Login />} />
                <Route path="/teacher/profile" element={<TeacherPage />} />
                <Route path="/teacher/create-link" element={<CreateLink />} />
            </Routes>
        </UserProvider>
    );
}

export default App;
