import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Typography } from '@mui/material';
import ActionAreaCard from '../components/Card';
import { useNavigate } from "react-router-dom";



function Home() {


    const [listOfDorms, setListOfDorms] = useState([]);
    let navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:3001/dorms").then((response) => {
            setListOfDorms(response.data);
        });
    }, []);


    return (
        <Container>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 13,
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="primary"
                        gutterBottom
                    >
                        Student Residences
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        If you are in search for a great student accomodation, you have arrived at the perfect place! Choose
                        the dorm you like, see details about it and write your feedback in the comments.
                    </Typography>
                </Container>
            </Box>
            <Box mt={10} mb={10} display="flex" justifyContent="center" flexWrap="wrap">
                {listOfDorms.map((dorm) => (
                    <Box key={dorm.id} flex="0 0 auto" minWidth="300px" maxWidth="400px" margin="10px" onClick={() => navigate(`/dorm/${dorm.id}`)}>
                        <ActionAreaCard data={dorm} />
                    </Box>
                ))}
            </Box>
        </Container>


    )
}

export default Home