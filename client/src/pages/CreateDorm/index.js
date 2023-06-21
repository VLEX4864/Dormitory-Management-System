import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../helpers/AuthContext';
import AccessDenied from '../../components/AccessDenied';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { styled } from '@mui/system';
import { Link } from "react-router-dom";


const validationSchema = Yup.object({
    name: Yup.string().required('Dormitory Name is required'),
    administrator: Yup.string().required('Administrator Name is required'),
    adress: Yup.string().required('Address is required'),
    description: Yup.string().required('Description is required'),
    rooms: Yup.number().required('Number of Rooms Available is required').positive('Number must be positive'),
    room_capacity: Yup.number().required('Room Capacity is required').positive('Number must be positive'),
    maps_link: Yup.string()
        .required('Link is required')
        .url('Invalid URL format')
        .matches(/^https:/, 'Link must start with "https://"'),
    phone: Yup.string()
        .required('Phone Number is required')
        .matches(/^[0-9]{10}$/, 'Phone Number must be a 10-digit number'),
});

const StyledLink = styled(Link)({
    textDecoration: 'none'
});

function CreateDorm() {
    const { authState } = React.useContext(AuthContext);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            administrator: "",
            adress: "",
            description: "",
            rooms: "",
            room_capacity: "",
            maps_link: "",
            phone: "",
            url: ""
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            //Need to implement a PUT request
            axios.post("http://localhost:3001/dorms", values).then((response) => {
                navigate("/");
            });
            console.log(values);
        },
    });


    console.log(authState.role)

    if (authState.role === 'superadmin') {
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
                        label="Maps link"
                        variant="outlined"
                        name="maps_link"
                        value={formik.values.maps_link}
                        onChange={formik.handleChange}
                        error={formik.touched.maps_link && Boolean(formik.errors.maps_link)}
                        helperText={formik.touched.maps_link && formik.errors.maps_link}
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Box display="flex" sx={{ flexWrap: 'wrap' }} alignItems="center" mr={2}>
                        <TextField
                            label="Image url"
                            variant="outlined"
                            name="url"
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            error={formik.touched.url && Boolean(formik.errors.url)}
                            helperText={formik.touched.url && formik.errors.url}
                        />
                        <Typography variant="body1" color="primary" target="_blank" ml={2} component={StyledLink} underline="none" to={"https://imgbb.com/"}>
                            Get image url here
                        </Typography>
                    </Box>

                    <Button type="submit" variant="contained" color="primary">
                        Create Dormitory
                    </Button>
                </Box>
            </Box>
        )
    } else {
        return (
            <AccessDenied />
        )
    }


}


export default CreateDorm