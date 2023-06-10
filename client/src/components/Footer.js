import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                textAlign: 'center',
                mt: 3
            }}
        >
            <Typography variant="body2" color="textSecondary">
                &copy; {new Date().getFullYear()} Dormitory Management System. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;