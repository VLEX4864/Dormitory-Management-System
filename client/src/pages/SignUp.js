import { Formik, Form } from "formik";
import { Button, Box } from '@mui/material';
import * as Yup from 'yup';
import FormikField from "../components/FormikField";
import FormikSelect from "../components/FormikSelect";
import axios from "axios";

function SignUp() {
  const initialValues = {
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
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(5).max(20).required(),
    firstname: Yup.string().max(30).required(),
    lastname: Yup.string().max(30).required(),
    email: Yup.string().email(),
    cnp: Yup.string()
      .required()
      .matches(/^[0-9]{13}$/, 'Must contain 13 digits'),
    faculty: Yup.string().min(3).max(6).required(),
    degree: Yup.string().min(3).max(3).required(),
    year: Yup.string()
      .required()
      .matches(/^[0-3]{1}$/, 'Can only be 1, 2 or 3'),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log(data);
    });
  }

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
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <Box>
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
              <FormikField name="cnp" label="CNP" ></FormikField>
            </Box>
            <Box sx={{ p: '15px' }}>
              <FormikSelect name="faculty" items={facultyItems} label="Faculty"></FormikSelect>
            </Box>
            <Box sx={{ p: '15px' }}>
              <FormikSelect name="degree" items={degreeItems} label="Degree"></FormikSelect>
            </Box>
            <Box sx={{ p: '15px' }}>
              <FormikSelect name="year" items={yearItems} label="Year"></FormikSelect>
            </Box>
            <Button type='submit' variant="contained">Sign Up</Button>
          </Box>
        </Form >
      </Formik >
    </>
  )
}


export default SignUp