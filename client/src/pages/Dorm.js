import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Grid, Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';


const LeftSideContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
    },

    border: '1px solid gray',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    borderRadius: '30px',
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10)
}));

const RightSideContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20
});

const ImageContainer = styled(Box)({
    width: '100%',
    maxWidth: 300,
    marginBottom: 4
});




function Dorm() {

    let { id } = useParams();
    const [dormObject, setDormObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/dorms/byId/${id}`).then((response) => {
            setDormObject(response.data);
        });
    });

    return (
        <Grid container spacing={2} mt={10}>
            {/* Left Side */}
            <Grid item xs={12} sm={6} pb={3}>
                <LeftSideContainer>
                    <ImageContainer >
                        <img
                            src="https://i.pinimg.com/originals/f7/ab/d8/f7abd8ab39d92835139687d70b556d58.jpg"
                            alt="Dorm picturee"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </ImageContainer>
                    <Typography variant="h5" align="center" color="primary">
                        Name: {dormObject.name}
                    </Typography>
                    <Typography variant="body1" align="center" color="primary">
                        Adress: {dormObject.adress}
                    </Typography>
                    <Typography variant="body1" align="center" color="primary">
                        Administrator: {dormObject.administrator}
                    </Typography>
                </LeftSideContainer>
            </Grid>

            <Grid item xs={12} sm={6}>
                <RightSideContainer>
                    <Typography variant="h5" align="center" color="primary">
                        Comment Section
                    </Typography>
                    <Box width="80%" mt={2}>
                        <Box mb={2}>
                            <TextField
                                label="Your Comment"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                sx={{
                                    maxWidth: '300px',
                                    minWidth: '200px',
                                }}
                            />
                        </Box>

                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </RightSideContainer>
            </Grid>
        </Grid>
    );
}

export default Dorm