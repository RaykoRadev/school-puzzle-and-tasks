import { Route, Routes } from "react-router";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";

function App() {
    return (
        <>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
