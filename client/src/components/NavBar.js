import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { AuthContext } from '../helpers/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";






function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { authState, setAuthState } = React.useContext(AuthContext);
    let navigate = useNavigate();

    const pages = [{ link: "/createDorm", title: "Create a dormitory", displayLink: authState.role === 'superadmin' }, { link: "/AdminRegister", title: "Register Admin", displayLink: authState.role === 'superadmin' }, { link: "/signUp", title: "SignUp", displayLink: !authState.status }, { link: "/logIn", title: "LogIn", displayLink: !authState.status }, { link: "/editDormitory", title: "Edit dormitory", displayLink: authState.role === 'admin' }, { link: "/AdminTable", title: "Admin Dashboard", displayLink: authState.role === 'admin' }];
    const settings = [{ link: "/", title: "Logout", displayLink: authState.status }];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({
            username: "",
            id: 0,
            status: false,
            role: "",
            dormId: ""
        });
        navigate("/");
        //Forcing a refresh of the page so the navbar updates
        window.location.reload();
    }





    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        HOME
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(({ link, title, displayLink }, index) => {
                                if (!displayLink) return null;

                                return (
                                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                                        <Link variant="h7" underline="none" component={RouterLink} to={link}>
                                            <Typography sx={{ color: "black" }}>
                                                {title}
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DMS
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(({ link, title, displayLink }, index) => {
                            if (!displayLink) return null;

                            return (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link variant="h7" underline="none" component={RouterLink} to={link}>
                                        <Typography sx={{ color: "white" }}>
                                            {title}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            )
                        })}
                    </Box>

                    <Box sx={{ display: 'flex' }} >
                        <Typography sx={{ marginRight: '20px', paddingTop: '8px' }}>
                            {authState.username}
                        </Typography>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleIcon fontSize='large' color='white' />
                            </IconButton>
                        </Tooltip>

                        {authState.status &&


                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted

                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map(({ link, title, displayLink }, index) => {
                                    if (!displayLink) return null;

                                    return (
                                        <MenuItem key={index} onClick={logout}>
                                            <Typography textAlign="center">{title}</Typography>
                                        </MenuItem>
                                    )
                                })}
                            </Menu>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;