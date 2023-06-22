import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";



const validationSchema = Yup.object({
  username: Yup.string().min(3).max(15).required('Username is required'),
  password: Yup.string().min(5).max(20).required('Password is required'),
  firstname: Yup.string().min(2).max(30).required('First Name is required'),
  lastname: Yup.string().min(2).max(30).required('Last Name is required'),
  email: Yup.string().email().required('Email is required'),
  dormId: Yup.string().required('Dorm is required'),
  cnp: Yup.string()
    .required()
    .matches(/^[0-9]{13}$/, 'Must contain 13 digits'),
  faculty: Yup.string().min(3).max(6).required(),
  degree: Yup.string().min(3).max(3).required(),
  year: Yup.string()
    .required()
    .matches(/^[0-3]{1}$/, 'Can only be 1, 2 or 3')
});


function Register() {
  const [listOfDorms, setListOfDorms] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/dorms").then((response) => {
      setListOfDorms(response.data);
    });
  }, []);


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "user",
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
        navigate("/");
      });
    },
  });

  const facultyItems = [
    {
      label: "FAD",
      value: "FAD"
    },
    {
      label: "FCBG",
      value: "FCBG"
    },
    {
      label: "Drept",
      value: "Drept"
    },
    {
      label: "FEAA",
      value: "FEAA"
    },
    {
      label: "FEFS",
      value: "FEFS"
    },
    {
      label: "Fizica",
      value: "Fizica"
    },
    {
      label: "LIT",
      value: "LIT"
    },
    {
      label: "FMI",
      value: "FMI"
    },
    {
      label: "FMT",
      value: "FMT"
    },
    {
      label: "FSP",
      value: "FSP"
    },
    {
      label: "FSPFSC",
      value: "FSPFSC"
    }
  ]

  const degreeItems = [
    {
      label: "BSc",
      value: "BSc"
    },
    {
      label: "MSc",
      value: "MCs"
    },
    {
      label: "PhD",
      value: "Phd"
    }
  ]

  const yearItems = [
    {
      label: "1",
      value: "1"
    },
    {
      label: "2",
      value: "2"
    },
    {
      label: "3",
      value: "3"
    }
  ]


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
        Sign Up
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
          sx={{ width: '50%' }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
          sx={{ width: '50%' }}
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
          sx={{ width: '50%' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password} sx={{ width: '50%' }} />
      </Box>


      <TextField
        label="CNP"
        variant="outlined"
        multiline
        rows={1}
        name="cnp"
        value={formik.values.cnp}
        onChange={formik.handleChange}
        error={formik.touched.cnp && Boolean(formik.errors.cnp)}
        helperText={formik.touched.cnp && formik.errors.cnp}
      />

      <Box sx={{ display: 'flex', gap: '20px' }}>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel id="country-label">Faculty</InputLabel>
          <Select
            labelId="country-label"
            id="faculty"
            name="faculty"
            value={formik.values.faculty}
            onChange={formik.handleChange}
            error={formik.touched.faculty && Boolean(formik.errors.faculty)}
            label="Faculty"
          >
            {facultyItems.map((faculty) => (
              <MenuItem key={faculty.label} value={faculty.value}>
                {faculty.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel id="country-label">Degree</InputLabel>
          <Select
            labelId="country-label"
            id="degree"
            name="degree"
            value={formik.values.degree}
            onChange={formik.handleChange}
            error={formik.touched.degree && Boolean(formik.errors.degree)}
            label="Degree"
          >
            {degreeItems.map((degree) => (
              <MenuItem key={degree.label} value={degree.value}>
                {degree.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', gap: '20px' }}>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel id="country-label">Year</InputLabel>
          <Select
            labelId="country-label"
            id="year"
            name="year"
            value={formik.values.year}
            onChange={formik.handleChange}
            error={formik.touched.year && Boolean(formik.errors.year)}
            label="Year"
          >
            {yearItems.map((year) => (
              <MenuItem key={year.label} value={year.value}>
                {year.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
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
      </Box>

      <Button type="submit" variant="contained" color="primary" sx={{
        display: 'block',
        margin: '0 auto',
        width: '50%'
      }}>
        Register
      </Button>

    </Box>
  );



};


export default Register;