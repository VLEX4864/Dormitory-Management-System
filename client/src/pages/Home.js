import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from '@mui/material';
import ActionAreaCard from '../components/Card';

function Home() {


    const [listOfDorms, setListOfDorms] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/dorms").then((response) => {
            setListOfDorms(response.data);
        });
    }, []);

    return (
        <Box>
            <ActionAreaCard></ActionAreaCard>
            <div>
                {listOfDorms.map((value) => {
                    return (
                        <div className='dorm' key={value.id}>
                            <div className='name'> {value.name} </div>
                            <div className='admin'> {value.administrator} </div>
                            <div className='adress'> {value.adress} </div>
                        </div>
                    );
                })}
            </div>
        </Box>

    )
}

export default Home