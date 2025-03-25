import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "react";

function Copyright() {
    return (
        <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

export default Copyright;