import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Grid, Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from "react-router-dom";


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
    maxWidth: '95%',
    marginBottom: 4
});

const CommentBox = styled(Box)({
    border: '1px solid gray',
    borderRadius: '5px',
    width: '60%',
    maxWidth: 300,
    margin: 10,
    padding: 10
})

const TextContainer = styled(Box)({
    textAlign: 'left',
});

const StyledLink = styled(Link)({
    textDecoration: 'none'
});




function Dorm() {

    let { id } = useParams();
    const [dormObject, setDormObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:3001/dorms/byId/${id}`).then((response) => {
            setDormObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, [id]);

    const addComment = () => {
        axios.post("http://localhost:3001/comments", {
            comment: newComment, DormId: id
        },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        )
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    const comm = { comment: newComment, user: response.data.user };
                    setComments([...comments, comm]);
                    setNewComment("");
                }
            });
    }

    return (
        <Grid container spacing={2} mt={10} mb={10}>
            <Grid item xs={12} sm={6} pb={3}>
                <LeftSideContainer>
                    <ImageContainer align="center">
                        <img
                            src={dormObject.url}
                            alt="Dorm picturee"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </ImageContainer>
                    <TextContainer sx={{ width: '-webkit-fill-available' }}>
                        <Box display="flex" sx={{ flexWrap: 'wrap' }} alignItems="center" bgcolor="#e3f2fd" p={2} m={2}>
                            <Typography variant="body1" color="primary">
                                <strong>Name:</strong>
                            </Typography>
                            <Typography variant="body1" color="textSecondary" ml={1}>
                                {dormObject.name}
                            </Typography>
                        </Box>
                        <Box display="flex" sx={{ flexWrap: 'wrap' }} alignItems="center" bgcolor="#e3f2fd" p={2} m={2}>
                            <Typography variant="body1" color="primary">
                                <strong>Adress:</strong>
                            </Typography>
                            <Typography variant="body1" color="textSecondary" ml={1}>
                                {dormObject.adress}
                            </Typography>
                        </Box>
                        <Box display="flex" sx={{ flexWrap: 'wrap' }} alignItems="center" bgcolor="#e3f2fd" p={2} m={2}>
                            <Typography variant="body1" color="primary">
                                <strong>Description:</strong>
                            </Typography>
                            <Typography variant="body1" color="textSecondary" ml={1}>
                                {dormObject.description}
                            </Typography>
                        </Box>
                        <Box display="flex" sx={{ flexWrap: 'wrap' }} alignItems="center" bgcolor="#e3f2fd" p={2} m={2}>
                            <Typography variant="body1" color="primary">
                                <strong>Available rooms:</strong>
                            </Typography>
                            <Typography variant="body1" color="textSecondary" ml={1}>
                                {dormObject.rooms}
                            </Typography>
                        </Box>
                        <Box display="flex" sx={{ flexWrap: 'wrap' }} alignItems="center" bgcolor="#e3f2fd" p={2} m={2}>
                            <Typography variant="body1" color="primary">
                                <strong>Room capacity:</strong>
                            </Typography>
                            <Typography variant="body1" color="textSecondary" ml={1}>
                                {dormObject.room_capacity}
                            </Typography>
                        </Box>
                        <Box display="flex" sx={{ flexWrap: 'wrap' }} alignItems="center" bgcolor="#e3f2fd" p={2} m={2}>
                            <Typography variant="body1" color="primary" component={StyledLink} target="_blank" underline="none" to={dormObject.maps_link}>
                                <strong>Location on Maps</strong>
                            </Typography>
                        </Box>

                    </TextContainer>
                </LeftSideContainer>
            </Grid>

            <Grid item xs={12} sm={6}>
                <RightSideContainer>
                    <Typography variant="h4" align="center" color="primary" >
                        Comment Section
                    </Typography>
                    <Box width="80%" mt={2}>
                        <Box mb={2} ml={1} display={'flex'}>
                            <TextField
                                label="Your Comment"
                                value={newComment}
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                sx={{
                                    maxWidth: '300px',
                                    minWidth: '200px',
                                }}
                                onChange={(event) => { setNewComment(event.target.value) }}
                            />
                            <Button onClick={addComment} size="large" variant="contained" color="primary" sx={{ margin: '14px' }}>
                                Submit
                            </Button>
                        </Box>
                        <Box>
                            {comments.map((comment, key) => {
                                return <CommentBox display="flex" sx={{ flexWrap: 'wrap' }} key={key}>
                                    <Typography variant="body1" color="primary">
                                        <strong>{comment.user}:</strong>
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" ml={1}>
                                        {comment.comment}
                                    </Typography>
                                </CommentBox>
                            })}
                        </Box>
                    </Box>
                </RightSideContainer>
            </Grid>
        </Grid >
    );
}

export default Dorm