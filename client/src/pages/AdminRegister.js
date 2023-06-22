import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from "../helpers/AuthContext";
import axios from 'axios';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AccessDenied from '../components/AccessDenied';


const validationSchema = Yup.object({
    username: Yup.string().min(3).max(15).required('Username is required'),
    password: Yup.string().min(5).max(20).required('Password is required'),
    firstname: Yup.string().min(2).max(30).required('First Name is required'),
    lastname: Yup.string().min(2).max(30).required('Last Name is required'),
    email: Yup.string().email().required('Email is required'),
    dormId: Yup.string().required('Dorm is required'),
});



function AdminRegister() {
    const { authState } = React.useContext(AuthContext);
    const [listOfDorms, setListOfDorms] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/dorms").then((response) => {
            setListOfDorms(response.data);
        });
    }, []);


    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            role: "admin",
            firstname: "",
            lastname: "",
            email: "",
            cnp: "",
            faculty: "",
            degree: "",
            year: "",
            dormId: ""
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            axios.post("http://localhost:3001/auth", values).then((response) => {
                alert("Administrator account created!")
            });
        },
    });


    if (authState.role !== 'superadmin') {
        return (
            <AccessDenied />
        )
    } else {
        return (
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    maxWidth: '40%',
                    margin: 'auto',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    marginTop: 16,
                    marginBottom: 10
                }}
                onSubmit={formik.handleSubmit}
            >
                <Typography color="primary" variant="h4" sx={{ textAlign: 'center' }}>
                    Register Administrator
                </Typography>

                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        name="firstname"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                        helperText={formik.touched.firstname && formik.errors.firstname}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        name="lastname"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                        helperText={formik.touched.lastname && formik.errors.lastname}
                    />
                </Box>
                <TextField
                    label="Email"
                    variant="outlined"
                    multiline
                    rows={1}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password} />
                </Box>

                <FormControl variant="outlined">
                    <InputLabel id="country-label">Dormitory</InputLabel>
                    <Select
                        labelId="country-label"
                        id="dormId"
                        name="dormId"
                        value={formik.values.dormId}
                        onChange={formik.handleChange}
                        error={formik.touched.dormId && Boolean(formik.errors.dormId)}
                        label="Dormitory"
                    >
                        {listOfDorms.map((dorm) => (
                            <MenuItem key={dorm.id} value={dorm.id}>
                                {dorm.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="primary" sx={{
                    display: 'block',
                    margin: '0 auto',
                    width: '50%'
                }}>
                    Register Administrator
                </Button>

            </Box>
        );

    }

};


export default AdminRegister;