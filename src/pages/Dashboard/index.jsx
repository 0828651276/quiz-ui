import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Dashboard() {
    const [quizzes, setQuizzes] = useState([]);
    const [editingQuiz, setEditingQuiz] = useState(null);
    const [formData, setFormData] = useState({ id: "", title: "", description: "" });

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/quiz/quizzes");
            setQuizzes(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách quiz:", error);
            alert("Không thể tải danh sách quiz, vui lòng thử lại!");
        }
    };

    const updateQuiz = async (e) => {
        e.preventDefault();

        // Kiểm tra xem formData.id có giá trị hợp lệ không
        if (!formData.id) {
            alert("Lỗi: ID không hợp lệ!");
            return;
        }

        try {
            await axios.put(`http://localhost:8080/api/quiz/quizzes/${formData.id}`, {
                title: formData.title,
                description: formData.description
            });

            setQuizzes(quizzes.map(quiz =>
                quiz.id === formData.id ? { ...quiz, title: formData.title, description: formData.description } : quiz
            ));

            setEditingQuiz(null);
            setFormData({ id: "", title: "", description: "" });
        } catch (error) {
            console.error("Lỗi khi cập nhật quiz:", error);
            alert("Không thể cập nhật quiz, vui lòng thử lại!");
        }
    };



    const deleteQuiz = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa quiz này?")) {
            try {
                await axios.delete(`http://localhost:8080/api/quiz/quizzes/${id}`);
                setQuizzes(quizzes.filter(quiz => quiz.id !== id));
            } catch (error) {
                console.error("Lỗi khi xóa quiz:", error);
                alert("Không thể xóa quiz, vui lòng thử lại!");
            }
        }
    };

    const startEditing = (quiz) => {
        setEditingQuiz(quiz.id);
        setFormData({ id: quiz.id, title: quiz.title, description: quiz.description });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addQuiz = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/quiz", {
                title: formData.title,
                description: formData.description
            });
            setQuizzes([...quizzes, response.data]);
            setFormData({ id: "", title: "", description: "" });
        } catch (error) {
            console.error("Lỗi khi thêm quiz:", error);
            alert("Không thể thêm quiz, vui lòng thử lại!");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Danh sách Quiz</h2>

            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Tên Quiz</th>
                    <th>Mô tả</th>
                    <th style={{ width: "120px", textAlign: "center" }}>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <tr key={quiz.id}>
                            <td>{quiz.id}</td>
                            <td>{quiz.title}</td>
                            <td>{quiz.description}</td>
                            <td className="text-center">
                                <div className="btn-group btn-group-sm">
                                    <button className="btn btn-warning" onClick={() => startEditing(quiz)}>✏ Sửa</button>
                                    <button className="btn btn-danger" onClick={() => deleteQuiz(quiz.id)}>🗑 Xóa</button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">Không có quiz nào.</td>
                    </tr>
                )}
                </tbody>
            </table>

            <div className="mt-4">
                <h3>{editingQuiz ? "Cập nhật Quiz" : "Thêm Quiz"}</h3>
                <form onSubmit={editingQuiz ? updateQuiz : addQuiz}>
                    <div className="mb-3">
                        <label className="form-label">Tên Quiz</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {editingQuiz ? "Cập nhật" : "Thêm"}
                    </button>
                    {editingQuiz && (
                        <button type="button" className="btn btn-secondary ms-1" onClick={() => setEditingQuiz(null)}>Hủy</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Dashboard;
