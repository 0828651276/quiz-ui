import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function BookList() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        username: "",
        email: "",
        phone: "",
        is_teacher: false
    });

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

    const deleteUser = async (id, username) => {
        Swal.fire({
            title: "Xác nhận xóa",
            text: `Bạn có chắc chắn muốn xóa người dùng "${username}" không? Hành động này không thể hoàn tác!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8080/api/user/${id}`);
                    setUsers(users.filter(user => user.id !== id));
                    Swal.fire("Đã xóa!", `Người dùng "${username}" đã bị xóa thành công.`, "success");
                } catch (error) {
                    console.error("Lỗi khi xóa người dùng:", error);
                    Swal.fire("Lỗi!", "Đã xảy ra lỗi khi xóa. Vui lòng thử lại!", "error");
                }
            }
        });
    };

    const startEditing = (user) => {
        setEditingUser(user.id);
        setFormData({
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone || "",
            is_teacher: user.is_teacher || false
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/user/${formData.id}`, {
                username: formData.username,
                email: formData.email,
                phone: formData.phone || 0,
                is_teacher: formData.is_teacher || false
            });
            setEditingUser(null);
            fetchUsers();
            Swal.fire("Cập nhật thành công!", "Thông tin người dùng đã được cập nhật.", "success");
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
            Swal.fire("Lỗi!", "Không thể cập nhật người dùng. Vui lòng thử lại!", "error");
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
                    <th>Điện thoại</th>
                    <th>Giáo viên</th>
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
                            <td>{user.phone || "Không có"}</td>
                            <td>{user.is_teacher ? "✅ Có" : "❌ Không"}</td>
                            <td className="text-center">
                                <div className="btn-group btn-group-sm">
                                    <button className="btn btn-warning" onClick={() => startEditing(user)}>✏ Sửa</button>
                                    <button className="btn btn-danger"
                                            onClick={() => deleteUser(user.id, user.username)}>🗑 Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">Không có người dùng nào.</td>
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
                        <div className="mb-3">
                            <label className="form-label">Điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                name="is_teacher"
                                checked={formData.is_teacher}
                                onChange={handleInputChange}
                                className="form-check-input"
                            />
                            <label className="form-check-label">Là giáo viên</label>
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
