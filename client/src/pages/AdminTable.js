import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography } from '@mui/material';
import AccessDenied from "../components/AccessDenied";
import { AuthContext } from "../helpers/AuthContext";

const users = [
    {
        id: 1,
        username: 'andrei12',
        firstname: 'Andrei',
        lastname: 'Flore',
        email: 'andrei.flore@e-uvt.ro',
        cnp: '1234567890',
        faculty: 'FMI',
        degree: 'BSc',
        year: '2',
    },


    // Add more user objects as needed
];

function AdminTable() {
    const [editMode, setEditMode] = useState({});
    const { authState } = React.useContext(AuthContext);

    const handleEditClick = (userId) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [userId]: true,
        }));
    };

    const handleCancelClick = (userId) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [userId]: false,
        }));
    };

    const handleSaveClick = (userId) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [userId]: false,
        }));

        // Perform save operation or update the user data in your state or database
    };

    const renderField = (user, field, userId) => {
        if (editMode[userId]) {
            return (
                <TextField
                    value={user[field]}
                    onChange={(e) => handleFieldChange(e, field, userId)}
                    fullWidth
                />
            );
        } else {
            return user[field];
        }
    };

    const handleFieldChange = (e, field, userId) => {
        const { value } = e.target;

        // You can update the user data in your state or database
        // For simplicity, this example only updates the displayed value
        users.forEach((user) => {
            if (user.id === userId) {
                user[field] = value;
            }
        });
    };

    if (authState.role === 'admin') {
        return (
            <TableContainer component={Paper} sx={{ marginTop: '100px' }}>
                <Typography color="primary" variant="h3">
                    Table of Residents
                </Typography>
                <Table sx={{ marginTop: '20px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>CNP</TableCell>
                            <TableCell>Faculty</TableCell>
                            <TableCell>Degree</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{renderField(user, 'firstname', user.id)}</TableCell>
                                <TableCell>{renderField(user, 'lastname', user.id)}</TableCell>
                                <TableCell>{renderField(user, 'username', user.id)}</TableCell>
                                <TableCell>{renderField(user, 'email', user.id)}</TableCell>
                                <TableCell>{renderField(user, 'cnp', user.id)}</TableCell>
                                <TableCell>{renderField(user, 'faculty', user.id)}</TableCell>
                                <TableCell>{renderField(user, 'degree', user.id)}</TableCell>
                                <TableCell>{renderField(user, 'year', user.id)}</TableCell>
                                <TableCell>
                                    {editMode[user.id] ? (
                                        <>
                                            <IconButton onClick={() => handleSaveClick(user.id)}>
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleCancelClick(user.id)}>
                                                <CancelIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton onClick={() => handleEditClick(user.id)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return (
            <AccessDenied />
        )
    }

};

export default AdminTable;