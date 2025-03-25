import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    CircularProgress
} from '@mui/material';

function ForgotPassword({ open, handleClose }) {
    const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập mã OTP
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState(null);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }

        setError('');
        setLoading(true);

        try {
            // Giả lập gửi OTP qua email (thực tế sẽ gọi API)
            const otpCode = Math.floor(100000 + Math.random() * 900000); // Tạo mã OTP 6 số
            console.log(`OTP sent to ${email}:`, otpCode);
            setGeneratedOtp(otpCode);

            await new Promise((resolve) => setTimeout(resolve, 2000)); // Giả lập delay gửi email

            setStep(2); // Chuyển sang bước nhập OTP
        } catch (error) {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = (event) => {
        event.preventDefault();
        if (otp !== generatedOtp.toString()) {
            setError('Incorrect OTP. Please try again.');
            return;
        }

        // Nếu mã OTP đúng, chuyển hướng về trang User
        console.log('OTP verified. Redirecting to user page...');
        window.location.href = '/user'; // Điều hướng về trang user
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            {step === 1 ? (
                <form onSubmit={handleEmailSubmit}>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        <DialogContentText>
                            Enter your email address, and we&apos;ll send you a verification code.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!error}
                            helperText={error}
                        />
                    </DialogContent>
                    <DialogActions sx={{ pb: 3, px: 3 }}>
                        <Button onClick={handleClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit" disabled={loading || !email}>
                            {loading ? <CircularProgress size={24} /> : 'Continue'}
                        </Button>
                    </DialogActions>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit}>
                    <DialogTitle>Verify OTP</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        <DialogContentText>
                            We have sent a 6-digit code to <strong>{email}</strong>. Please enter it below.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            label="Enter OTP"
                            type="text"
                            fullWidth
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            error={!!error}
                            helperText={error}
                        />
                    </DialogContent>
                    <DialogActions sx={{ pb: 3, px: 3 }}>
                        <Button onClick={() => setStep(1)}>Back</Button>
                        <Button variant="contained" type="submit">
                            Verify
                        </Button>
                    </DialogActions>
                </form>
            )}
        </Dialog>
    );
}

ForgotPassword.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
