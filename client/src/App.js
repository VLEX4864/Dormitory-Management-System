import { useEffect, useState } from "react";
import {Button, Box} from '@mui/material';
import './App.css';
import axios from "axios";
import { color } from "@mui/system";
import { styled } from '@mui/system';

// const useStyles = makeStyles(()=>{
//   container: {
//     height: "100%",
//     backgroundColor: "red";
//   }
// });

const MyComponent = styled('div')({   
  height: "100vh",
  color: 'darkslategray',  
  backgroundColor: 'red',   
  padding: 8,   
  borderRadius: 4,
});

 

function App() {
  const [listOfDorms, setListOfDorms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/dorms").then((response) => {
      setListOfDorms(response.data);
    })
  }, []);



  return (
    <MyComponent>
      {listOfDorms.map((value) => {
        return (
            <div className='dorm' key={value.adress}>
                <div className='name'> {value.name} </div>
                <div className='admin'> {value.administrator} </div>
                <div className='adress'> {value.adress} </div>
            </div>
        );
     })} 
    </MyComponent>
  );

}

export default App;
