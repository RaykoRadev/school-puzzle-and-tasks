import { Route, Routes } from "react-router";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import AdminPage from "./components/adminPage/AdminPage";
import UserProvider from "./provider/UserProvider";

function App() {
    return (
        <UserProvider>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/students/login" element={<Login />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/profile" element={<AdminPage />} />
            </Routes>
        </UserProvider>
    );
}

export default App;
