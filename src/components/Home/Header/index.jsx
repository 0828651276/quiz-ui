import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function Header(props) {
    const { onDrawerToggle } = props;
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    // Mở menu
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Đóng menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Xử lý đăng nhập (mô phỏng)
    const handleLogin = () => {
        setIsAuthenticated(true);
        setUser({ name: "John Doe" }); // Dữ liệu giả lập, thay bằng API thực tế
        handleClose();
    };

    // Xử lý đăng xuất
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        handleClose();
        window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
    };

    return (
        <React.Fragment>
            {/* Thanh AppBar chính */}
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Tooltip title="Alerts • No alerts">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {isAuthenticated ? (
                                        <>
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                        </>
                                    ) : (
                                        <>
                                            <MenuItem onClick={handleLogin}>Log In</MenuItem>
                                            <MenuItem onClick={handleClose}>Register</MenuItem>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* Thanh tiêu đề */}
            <AppBar component="div" color="primary" position="static" elevation={0} sx={{ zIndex: 0 }}>
                <Toolbar>
                    <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                Học - Học nữa - Học mãi
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* Tabs điều hướng */}
            <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
                <Tabs value={0} textColor="inherit">
                    <Tab label="List Quiz" />
                    <Tab label="List by type" />
                </Tabs>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
