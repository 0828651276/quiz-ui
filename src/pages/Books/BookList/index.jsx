import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function BookList() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ id: "", username: "", email: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/user/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách người dùng:", error);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            try {
                await axios.delete(`http://localhost:8080/api/user/${id}`);
                setUsers(users.filter(user => user.id !== id));
            } catch (error) {
                console.error("Lỗi khi xóa người dùng:", error);
            }
        }
    };

    const startEditing = (user) => {
        setEditingUser(user.id);
        setFormData({ id: user.id, username: user.username, email: user.email });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/user/${formData.id}`, {
                username: formData.username,
                email: formData.email
            });
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Danh sách Người Dùng</h2>
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th style={{ width: "120px", textAlign: "center" }}>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td className="text-center">
                                <div className="btn-group btn-group-sm">
                                    <button className="btn btn-warning" onClick={() => startEditing(user)}>✏ Sửa</button>
                                    <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>🗑 Xóa</button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">Không có người dùng nào.</td>
                    </tr>
                )}
                </tbody>
            </table>

            {editingUser && (
                <div className="mt-4">
                    <h3>Cập nhật Người Dùng</h3>
                    <form onSubmit={updateUser}>
                        <div className="mb-3">
                            <label className="form-label">Tên</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Cập nhật</button>
                        <button type="button" className="btn btn-secondary ms-1" onClick={() => setEditingUser(null)}>Hủy</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default BookList;
