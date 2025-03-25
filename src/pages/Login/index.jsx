import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box, Button, Checkbox, CssBaseline, FormControl, FormControlLabel,
    FormLabel, Link, TextField, Typography, Stack, Divider, Card as MuiCard
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import AppTheme from '../../template/shared-theme/AppTheme';
import ColorModeSelect from '../../template/shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcon/CustomIcons.jsx';
import ForgotPassword from "./ForgotPassword/Forgotpassword.jsx";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow: theme.shadows[5],
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    overflowY: 'auto',
}));


const SignInSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

export default function Login(props) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");

    const formLogin = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema: SignInSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setError("");
            try {
                const response = await axios.post("http://localhost:8080/api/user/login", values);

                localStorage.setItem("user", JSON.stringify(response.data));

                console.log("Login successful:", response.data);
                window.location.href = "/home";
            } catch (err) {
                console.error("Login error:", err);
                setError("Invalid username or password");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                <Card variant="outlined">
                    <SitemarkIcon />
                    <Typography component="h1" variant="h4" sx={{ fontSize: '2rem' }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={formLogin.handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <TextField
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={formLogin.values.username}
                                onChange={formLogin.handleChange}
                                onBlur={formLogin.handleBlur}
                                error={formLogin.touched.username && Boolean(formLogin.errors.username)}
                                helperText={formLogin.touched.username && formLogin.errors.username}
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••"
                                value={formLogin.values.password}
                                onChange={formLogin.handleChange}
                                onBlur={formLogin.handleBlur}
                                error={formLogin.touched.password && Boolean(formLogin.errors.password)}
                                helperText={formLogin.touched.password && formLogin.errors.password}
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Remember me"
                        />

                        {error && (
                            <Typography color="error" sx={{ textAlign: "center" }}>
                                {error}
                            </Typography>
                        )}

                        <ForgotPassword open={open} handleClose={() => setOpen(false)} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!formLogin.isValid || formLogin.isSubmitting}
                        >
                            {formLogin.isSubmitting ? "Signing in..." : "Sign in"}
                        </Button>

                        <Link component="button" type="button" onClick={() => setOpen(true)} variant="body2" sx={{ alignSelf: 'center' }}>
                            Forgot your password?
                        </Link>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <Divider>or</Divider>
                        <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
                            Sign in with Google
                        </Button>
                        <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
                            Sign in with Facebook
                        </Button>
                    </Box>

                    {/* ✅ Đưa nút Sign up xuống cuối */}
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            You don't have an account?
                        </Typography>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => window.location.href = "/register"}
                        >
                            Sign up
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}
