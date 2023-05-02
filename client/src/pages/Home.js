import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {


    const [listOfDorms, setListOfDorms] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/dorms").then((response) => {
            setListOfDorms(response.data);
        })
    }, []);

    return (
        <div>
            {listOfDorms.map((value) => {
                return (
                    <div className='dorm' key={value.adress}>
                        <div className='name'> {value.name} </div>
                        <div className='admin'> {value.administrator} </div>
                        <div className='adress'> {value.adress} </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Home