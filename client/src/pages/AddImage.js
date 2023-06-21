import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';


const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    image: Yup.string()
        .required('Link is required')
        .url('Invalid URL format')
        .matches(/^https:/, 'Link must start with "https://"'),
});



function AddImage() {

    const formik = useFormik({
        initialValues: {
            name: "",
            image: ""
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            //Need to implement a PUT request
            axios.post("http://localhost:3001/dorms", values).then((response) => {

            });
            console.log(values);
        },
    });




    return (
        <Box
            component="form"
            // method="POST"
            // action="http://localhost:3001/dorms/upload"
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
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
        >
            <Typography color="primary" variant="h4" sx={{ textAlign: 'center' }}>
                Configure Dormitory
            </Typography>

            <Box sx={{ display: 'flex', gap: '20px' }}>
                <TextField
                    label="Dormitory Name"
                    variant="outlined"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    label="Administrator Name"
                    variant="outlined"
                    name="administrator"
                    value={formik.values.administrator}
                    onChange={formik.handleChange}
                    error={formik.touched.administrator && Boolean(formik.errors.administrator)}
                    helperText={formik.touched.administrator && formik.errors.administrator}
                />
            </Box>
            <TextField
                label="Address"
                variant="outlined"
                multiline
                rows={2}
                name="adress"
                value={formik.values.adress}
                onChange={formik.handleChange}
                error={formik.touched.adress && Boolean(formik.errors.adress)}
                helperText={formik.touched.adress && formik.errors.adress}
            />
            <TextField label="Description"
                variant="outlined"
                multiline rows={3}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />

            <Box sx={{ display: 'flex', gap: '20px' }}>
                <TextField
                    label="Number of Rooms Available"
                    type="number"
                    variant="outlined"
                    name="rooms"
                    value={formik.values.rooms}
                    onChange={formik.handleChange}
                    error={formik.touched.rooms && Boolean(formik.errors.rooms)}
                    helperText={formik.touched.rooms && formik.errors.rooms}
                />
                <TextField
                    label="Room Capacity"
                    type="number"
                    variant="outlined"
                    name="room_capacity"
                    value={formik.values.room_capacity}
                    onChange={formik.handleChange}
                    error={formik.touched.room_capacity && Boolean(formik.errors.room_capacity)}
                    helperText={formik.touched.room_capacity && formik.errors.room_capacity}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: '20px' }}>
                <TextField
                    label="image"
                    variant="outlined"
                    name="image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                />
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone} />
            </Box>




            <Button type="submit" variant="contained" color="primary">
                Create Dormitory
            </Button>
        </Box>
    )


}


export default AddImage