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

const CommentBox = styled(Box)({
    border: '1px solid gray',
    borderRadius: '5px',
    width: '60%',
    maxWidth: 300,
    margin: 10,
    padding: 10
})




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
                    console.log(response.data.error);
                } else {
                    const comm = { comment: newComment, user: response.data.user };
                    setComments([...comments, comm]);
                    setNewComment("");
                }

            });
    }

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
                                return <CommentBox key={key}>
                                    <Typography>{comment.comment}</Typography>
                                    <label> {comment.user} </label>
                                </CommentBox>
                            })}
                        </Box>
                    </Box>
                </RightSideContainer>
            </Grid>
        </Grid>
    );
}

export default Dorm