import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccessDenied from "../components/AccessDenied";
import { AuthContext } from "../helpers/AuthContext";

const initialValues = {
    dormitoryName: '',
    administratorName: '',
    address: '',
    description: '',
    roomsAvailable: '',
    roomCapacity: '',
    mapsLink: '',
    phoneNumber: '',
};

const validationSchema = Yup.object({
    dormitoryName: Yup.string().required('Dormitory Name is required'),
    administratorName: Yup.string().required('Administrator Name is required'),
    address: Yup.string().required('Address is required'),
    description: Yup.string().required('Description is required'),
    roomsAvailable: Yup.number().required('Number of Rooms Available is required').positive('Number must be positive'),
    roomCapacity: Yup.number().required('Room Capacity is required').positive('Number must be positive'),
    mapsLink: Yup.string()
        .required('Link is required')
        .url('Invalid URL format')
        .matches(/^https:/, 'Link must start with "https://"'),
    phoneNumber: Yup.string()
        .required('Phone Number is required')
        .matches(/^[0-9]{10}$/, 'Phone Number must be a 10-digit number'),
});

function EditDormitory() {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            // Form submission logic to be implementeeeeedddddddddddddddddddddddddddddd
            console.log(values);
        },
    });

    const { authState } = React.useContext(AuthContext);

    if (authState.role === 'admin') {
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
            >
                <Typography color="primary" variant="h4" sx={{ textAlign: 'center' }}>
                    Edit Dormitory
                </Typography>

                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <TextField
                        label="Dormitory Name"
                        variant="outlined"
                        name="dormitoryName"
                        value={formik.values.dormitoryName}
                        onChange={formik.handleChange}
                        error={formik.touched.dormitoryName && Boolean(formik.errors.dormitoryName)}
                        helperText={formik.touched.dormitoryName && formik.errors.dormitoryName}
                    />
                    <TextField
                        label="Administrator Name"
                        variant="outlined"
                        name="administratorName"
                        value={formik.values.administratorName}
                        onChange={formik.handleChange}
                        error={formik.touched.administratorName && Boolean(formik.errors.administratorName)}
                        helperText={formik.touched.administratorName && formik.errors.administratorName}
                    />
                </Box>
                <TextField
                    label="Address"
                    variant="outlined"
                    multiline
                    rows={2}
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
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
                        name="roomsAvailable"
                        value={formik.values.roomsAvailable}
                        onChange={formik.handleChange}
                        error={formik.touched.roomsAvailable && Boolean(formik.errors.roomsAvailable)}
                        helperText={formik.touched.roomsAvailable && formik.errors.roomsAvailable}
                    />
                    <TextField
                        label="Room Capacity"
                        type="number"
                        variant="outlined"
                        name="roomCapacity"
                        value={formik.values.roomCapacity}
                        onChange={formik.handleChange}
                        error={formik.touched.roomCapacity && Boolean(formik.errors.roomCapacity)}
                        helperText={formik.touched.roomCapacity && formik.errors.roomCapacity}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <TextField
                        label="Maps link"
                        variant="outlined"
                        name="mapsLink"
                        value={formik.values.mapsLink}
                        onChange={formik.handleChange}
                        error={formik.touched.mapsLink && Boolean(formik.errors.mapsLink)}
                        helperText={formik.touched.mapsLink && formik.errors.mapsLink}
                    />
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" component="label" size="medium">
                        Change image
                        <input type="file" style={{ display: 'none' }} />
                    </Button>

                    <Button type="submit" variant="contained" color="primary">
                        Update Dormitory
                    </Button>
                </Box>
            </Box>


        );
    } else {
        return (
            <AccessDenied />
        )
    }

};


export default EditDormitory;