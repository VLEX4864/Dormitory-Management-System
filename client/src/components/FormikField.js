import { ErrorMessage, Field } from "formik";
import { TextField } from "@mui/material";


const FormikField = ({ name, label, type = "text" }) => {
    return (
        <div className="FormikField">
            <Field
                as={TextField}
                required
                autoComplete="off"
                label={label}
                name={name}
                type={type}
                helperText={<ErrorMessage name={name}>{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>}
            />
        </div>
    )
}

export default FormikField