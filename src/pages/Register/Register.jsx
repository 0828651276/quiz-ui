import "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // Schema validation với Yup
  const validationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Ít nhất 3 ký tự")
        .required("Vui lòng nhập tên người dùng"),
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
    phone: Yup.string()
        .matches(/^\d{10,11}$/, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại"),
    password: Yup.string()
        .min(6, "Mật khẩu ít nhất 6 ký tự")
        .required("Vui lòng nhập mật khẩu"),
    isTeacher: Yup.boolean(),
  });

  // Sử dụng Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      isTeacher: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
            "http://localhost:8080/api/user/register",
            values
        );
        console.log("Đăng ký thành công:", response.data);
        toast.success("Đăng ký thành công!");
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        toast.error("Đăng ký thất bại. Vui lòng thử lại!");
      }
    },
  });

  return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Đăng ký tài khoản
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                label="Tên người dùng"
                name="username"
                variant="outlined"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                variant="outlined"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
            />
            <FormControlLabel
                control={
                  <Checkbox
                      name="isTeacher"
                      checked={formik.values.isTeacher}
                      onChange={formik.handleChange}
                  />
                }
                label="Bạn có phải giáo viên không?"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
            >
              Đăng ký
            </Button>
          </form>
        </Paper>
        <ToastContainer />
      </Container>
  );
};

export default Register;
