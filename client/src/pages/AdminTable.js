import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import AccessDenied from "../components/AccessDenied";
import { AuthContext } from "../helpers/AuthContext";
import axios from 'axios';



function AdminTable() {
    const { authState } = React.useContext(AuthContext);
    const [dormObject, setDormObject] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/auth/getusers/${authState.dormId}`);
            setDormObject(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        if (authState.dormId !== '') {
            fetchData();
            // console.log(authState)
        }
    }, [authState.dormId]);


    const handleDelete = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/auth/deleteuser/${userId}`);
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
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
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dormObject.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstname}</TableCell>
                                <TableCell>{user.lastname}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.cnp}</TableCell>
                                <TableCell>{user.faculty}</TableCell>
                                <TableCell>{user.degree}</TableCell>
                                <TableCell>{user.year}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(user.id)}>
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