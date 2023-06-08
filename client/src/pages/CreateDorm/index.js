import React from 'react';
import { Formik, Form } from "formik";
import { Button, Box } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import FormikField from '../../components/FormikField';




function CreateDorm() {

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
            console.log('It worked!')
        });
    }




    return (
        <>
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
                </Form >
            </Formik >

        </>
    )
}


export default CreateDorm