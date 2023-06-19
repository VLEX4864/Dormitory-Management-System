import React from 'react';
import { Formik, Form } from "formik";
import { Button, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import FormikField from '../../components/FormikField';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../helpers/AuthContext';
import AccessDenied from '../../components/AccessDenied';
import TextField from '@mui/material/TextField';






function CreateDorm() {
    const { authState } = React.useContext(AuthContext);

    const initialValues = {
        name: "", administrator: "", adress: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        administrator: Yup.string().required(),
        adress: Yup.string().required(),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/dorms", data).then((response) => {
            navigate("/");
        });
    }


    let navigate = useNavigate();

    if (authState.role === 'superadmin') {
        return (
            <Box mt={8}>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <Box>
                            <Box sx={{ p: '15px' }}>
                                <FormikField name="name" label="Dormitory name" ></FormikField>
                            </Box>
                            <Box sx={{ p: '15px' }}>
                                <FormikField name="administrator" label="Administrator name" ></FormikField>
                            </Box>
                            <Box sx={{ p: '15px' }}>
                                <FormikField name="adress" label="Adress" ></FormikField>
                            </Box>
                            <Button type='submit' variant="contained">Create Dorm</Button>
                        </Box>




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
                                marginTop: 11,
                                marginBottom: 10
                            }}
                        >
                            <Typography color="primary" variant="h4" sx={{ textAlign: 'center' }}>
                                Configure Dormitory
                            </Typography>

                            <Box sx={{ display: 'flex', gap: '20px' }}>
                                <FormikField name="name" label="Dormitory name" ></FormikField>
                                <FormikField name="administrator" label="Administrator name" ></FormikField>
                            </Box>
                            <TextField label="Address" variant="outlined" multiline rows={2} />
                            <TextField label="Description" variant="outlined" multiline rows={3} />

                            <Box sx={{ display: 'flex', gap: '20px' }}>
                                <TextField
                                    label="Number of Rooms Available"
                                    type="number"
                                    variant="outlined"
                                />
                                <TextField label="Room Capacity" type="number" variant="outlined" />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '20px' }}>
                                <TextField label="Random 1" variant="outlined" />
                                <TextField label="Random 2" variant="outlined" />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="contained" component="label" size="medium">
                                    Add image
                                    <input type="file" style={{ display: 'none' }} />
                                </Button>

                                <Button variant="contained" color="primary" size="medium">
                                    Create Dormitory
                                </Button>
                            </Box>
                        </Box>
                    </Form >
                </Formik >

            </Box>
        )
    } else {
        return (
            <AccessDenied />
        )
    }


}


export default CreateDorm