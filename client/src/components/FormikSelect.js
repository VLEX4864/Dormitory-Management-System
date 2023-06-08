import React from "react"
import { Field, ErrorMessage } from "formik"
import { InputLabel, MenuItem, FormHelperText, FormControl, Select } from "@mui/material"


const MaterialUISelectField = ({
    errorString,
    label,
    children,
    value,
    name,
    onChange,
    onBlur,
    required
}) => {
    return (
        <FormControl style={{ minWidth: 222 }}>
            <InputLabel required={required}>{label}</InputLabel>
            <Select name={name} onChange={onChange} onBlur={onBlur} value={value}>
                {children}
            </Select>
            <FormHelperText>{errorString}</FormHelperText>
        </FormControl>
    )
}

const FormikSelect = ({ name, items, label, required = false }) => {
    return (
        <div className="FormikSelect">
            <Field
                name={name}
                as={MaterialUISelectField}
                label={label}
                errorString={<ErrorMessage name={name} />}
                required={required}
            >
                {items.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Field>
        </div>
    )
}


export default FormikSelect