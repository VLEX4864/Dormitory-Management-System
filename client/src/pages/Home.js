import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from '@mui/material';
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
        <Box mt={13} display="flex" justifyContent="center" flexWrap="wrap">
            {listOfDorms.map((dorm) => (
                <Box key={dorm.id} flex="0 0 auto" minWidth="300px" maxWidth="400px" margin="10px" onClick={() => navigate(`/dorm/${dorm.id}`)}>
                    <ActionAreaCard data={dorm} />
                </Box>
            ))}
        </Box>

    )
}

export default Home