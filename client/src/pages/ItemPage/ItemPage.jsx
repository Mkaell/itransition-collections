import { Divider, Grid, List, Paper, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItem } from '../../api'
import Comments from './Comments'
import InputComments from './InputComments'
import Item from './Item'
import { io } from "socket.io-client";
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
const ItemPage = () => {

    let socket = io('http://localhost:5047')
    const { email } = useSelector(state => state.auth.authData.result)
    const [item, setItem] = useState()
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const { idItem } = useParams();



    useEffect(() => {
        try {
            (async () => {
                const response = await getItem(idItem);
                setItem(response.data)
                setComments(response.data.comments)
            })()
        } catch (error) {
            console.log(error);
        }

    }, [])

    useEffect(() => {
        socket.emit("joinToRoom", idItem);
        socket.on("updateItemComments", (comms) => {
            setComments(comms);
        });
        return () => socket.disconnect();
    }, [idItem, socket])

    const handleOnChange = (event) => {
        setComment(event.target.value)
    }

    const addComment = (e) => {

        e.preventDefault();

        if (comment === "") return;

        setComments([
            ...comments,
            {
                id: uuidv4(),
                name: email,
                content: comment,
                date: new Date().toLocaleString(),
            }

        ]);

        let commentArr = [...comments,
        {
            id: uuidv4(),
            name: email,
            content: comment,
            date: new Date().toLocaleString(),
        }

        ]

        socket.emit("updateItemComments", {
            itemId: idItem,
            comments: commentArr,
        });

    };

    return (
        <Paper>
            <Grid container mt={5}>
                <Grid item xs={6}>
                    <Item item={item} />
                </Grid>
                <Grid item xs={6}>
                    <Grid container fullWidth rowSpacing={1}>
                        <Grid item xs={12}>
                            <Typography variant='h5' padding={1}>
                                Comments
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Comments comments={comments} />
                        </Grid>
                        <Grid item xs={12} >
                            <InputComments addComment={addComment} comment={comment} comments={comments} setComment={setComment} handleOnChange={handleOnChange} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>

    )
}

export default ItemPage