import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function QuestionDashboard() {
    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        text: "",
        options: "",
        correctOption: ""
    });

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/questions");
            setQuestions(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách câu hỏi:", error);
            alert("Không thể tải danh sách câu hỏi, vui lòng thử lại!");
        }
    };

    const updateQuestion = async (e) => {
        e.preventDefault();
        if (!formData.id) {
            alert("Lỗi: ID không hợp lệ!");
            return;
        }

        try {
            await axios.put(`http://localhost:8080/api/questions/${formData.id}`, {
                text: formData.text,
                options: formData.options.split(","),
                correctOption: formData.correctOption
            });

            setQuestions(questions.map(q =>
                q.id === formData.id ? { ...q, text: formData.text, options: formData.options.split(","), correctOption: formData.correctOption } : q
            ));

            setEditingQuestion(null);
            setFormData({ id: "", text: "", options: "", correctOption: "" });
        } catch (error) {
            console.error("Lỗi khi cập nhật câu hỏi:", error);
            alert("Không thể cập nhật câu hỏi, vui lòng thử lại!");
        }
    };

    const deleteQuestion = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
            try {
                await axios.delete(`http://localhost:8080/api/questions/${id}`);
                setQuestions(questions.filter(q => q.id !== id));
            } catch (error) {
                console.error("Lỗi khi xóa câu hỏi:", error);
                alert("Không thể xóa câu hỏi, vui lòng thử lại!");
            }
        }
    };

    const startEditing = (question) => {
        setEditingQuestion(question.id);
        setFormData({
            id: question.id,
            text: question.text,
            options: question.options.join(", "),
            correctOption: question.correctOption
        });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/questions", {
                text: formData.text,
                options: formData.options.split(","),
                correctOption: formData.correctOption
            });
            setQuestions([...questions, response.data]);
            setFormData({ id: "", text: "", options: "", correctOption: "" });
        } catch (error) {
            console.error("Lỗi khi thêm câu hỏi:", error);
            alert("Không thể thêm câu hỏi, vui lòng thử lại!");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Danh sách Câu hỏi</h2>

            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Câu hỏi</th>
                    <th>Đáp án</th>
                    <th>Đáp án đúng</th>
                    <th style={{ width: "120px", textAlign: "center" }}>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <tr key={question.id}>
                            <td>{question.id}</td>
                            <td>{question.text}</td>
                            <td>{question.options.join(", ")}</td>
                            <td>{question.correctOption}</td>
                            <td className="text-center">
                                <div className="btn-group btn-group-sm">
                                    <button className="btn btn-warning" onClick={() => startEditing(question)}>✏ Sửa</button>
                                    <button className="btn btn-danger" onClick={() => deleteQuestion(question.id)}>🗑 Xóa</button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">Không có câu hỏi nào.</td>
                    </tr>
                )}
                </tbody>
            </table>

            <div className="mt-4">
                <h3>{editingQuestion ? "Cập nhật Câu hỏi" : "Thêm Câu hỏi"}</h3>
                <form onSubmit={editingQuestion ? updateQuestion : addQuestion}>
                    <div className="mb-3">
                        <label className="form-label">Câu hỏi</label>
                        <input
                            type="text"
                            name="text"
                            value={formData.text}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Các đáp án (phân tách bằng dấu phẩy)</label>
                        <input
                            type="text"
                            name="options"
                            value={formData.options}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Đáp án đúng</label>
                        <input
                            type="text"
                            name="correctOption"
                            value={formData.correctOption}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {editingQuestion ? "Cập nhật" : "Thêm"}
                    </button>
                    {editingQuestion && (
                        <button type="button" className="btn btn-secondary ms-1" onClick={() => setEditingQuestion(null)}>Hủy</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default QuestionDashboard;
