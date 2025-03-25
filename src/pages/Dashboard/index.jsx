import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/quiz/quizzes");
            setQuizzes(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách quiz:", error);
        }
    };

    return (
        <div>
            <h2>Danh sách Quiz</h2>
            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên Quiz</th>
                    <th>Mô tả</th>
                </tr>
                </thead>
                <tbody>
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <tr key={quiz.id}>
                            <td>{quiz.id}</td>
                            <td>{quiz.title}</td>
                            <td>{quiz.description}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">Không có quiz nào.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
