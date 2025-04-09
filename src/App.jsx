import { Route, Routes, Navigate } from "react-router";
import Dashboard from "./pages/Dashboard/index.jsx";
import Master from "./components/Home/Layout/Master.jsx";
import BookList from "./pages/Books/BookList/index.jsx";
import SignIn from "./pages/Login/index.jsx";
import Register from "./pages/Register/Register.jsx";
import QuestionList from "./pages/Question/index.jsx";

function App() {
    return (
        <>
            <Routes>
                {/* Khi truy cập "/", chuyển hướng đến "/login" */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Master />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="books" element={<BookList />} />
                    <Route path="questions" element={<QuestionList />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
