import React from 'react';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid gray',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderRadius: '30px',
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginTop: '17%',
}));



const PageNotFound = () => {
    return (
        <Container>
            <Typography variant="h1" color="primary">Page Not Found</Typography>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h6" color="primary">
                    Oops! The page you're looking for does not exist. Go
                </Typography>
                <Link variant="h5" underline="none" component={RouterLink} to={"/"}>
                    <Typography sx={{ color: "primary", marginTop: '6px', marginLeft: '6px' }}>
                        HOME
                    </Typography>
                </Link>

            </Box>

        </Container>
    );
};

export default PageNotFound;