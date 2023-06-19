import { Formik, Form } from "formik";
import { Button, Box } from '@mui/material';
import * as Yup from 'yup';
import FormikField from "../components/FormikField";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from "../helpers/AuthContext";
import React from 'react';
import AccessDenied from "../components/AccessDenied";

const theme = createTheme();

function AdminRegister() {
    const { authState } = React.useContext(AuthContext);

    const initialValues = {
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
    };



    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(5).max(20).required(),
        firstname: Yup.string().max(30).required(),
        lastname: Yup.string().max(30).required(),
        email: Yup.string().email().required(),
        faculty: Yup.string().min(3).max(6).required(),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            console.log(data);
        });
    }


    if (authState.role === 'superadmin') {
        return (
            <ThemeProvider theme={theme}>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <Box mt={15} mb={10}>
                            <Box sx={{ p: '15px' }}>
                                <FormikField name="firstname" label="First name" ></FormikField>
                            </Box>
                            <Box sx={{ p: '15px' }}>
                                <FormikField name="lastname" label="Last name" ></FormikField>
                            </Box>
                            <Box sx={{ p: '15px' }}>
                                <FormikField name="email" label="Email" ></FormikField>
                            </Box>
                            <Box sx={{ p: '15px' }}>
                                <FormikField name="username" label="Username" ></FormikField>
                            </Box>
                            <Box sx={{ p: '15px' }}>
                                <FormikField name="password" label="Password" type="password"></FormikField>
                            </Box>
                            <Box sx={{ p: '15px' }}>
                                <FormikField name="faculty" label="Assigned Dormitory"></FormikField>
                            </Box>
                            <Button type='submit' variant="contained">Register Administrator</Button>
                        </Box>
                    </Form >
                </Formik >
            </ThemeProvider>
        )
    } else {
        return (
            <AccessDenied />
        )

    }


}


export default AdminRegister;