import { Route, Routes } from "react-router";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import TeacherPage from "./components/teacherPage/TeacherPage";
import UserProvider from "./provider/UserProvider";

function App() {
    return (
        <UserProvider>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/student/login" element={<Login />} />
                <Route path="/teacher/login" element={<Login />} />
                <Route path="/teacher/profile" element={<TeacherPage />} />
            </Routes>
        </UserProvider>
    );
}

export default App;
