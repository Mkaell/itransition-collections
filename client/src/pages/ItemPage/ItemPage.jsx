import { CircularProgress, Divider, Grid, List, Paper, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchItem } from '../../api'
import Comments from './Comments'
import InputComments from './InputComments'
import Item from './Item'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { StyledGrid, StyledGridComments, StyledGridItem } from './style'
import { useTheme } from '@emotion/react'
import { getItem } from '../../store/actionCreators/itemsCreator'
import { Box } from '@mui/system'
import { format } from 'date-fns'
import { useIntl } from 'react-intl'

const ItemPage = () => {

    let socket = io('http://localhost:5047')
    const email = useSelector(state => state?.auth?.authData?.result?.email)
    const { isLoading } = useSelector(state => state?.items)
    const dispatch = useDispatch()
    const [item, setItem] = useState()
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const { idItem } = useParams();
    const { messages } = useIntl()

    useEffect(() => {
        dispatch(getItem(idItem)).then(
            data => {
                setItem(data)
                setComments(data.comments)
            })
    }, [])

    useEffect(() => {
        socket.emit("joinToRoom", idItem);
        socket.on("updateItemComments", (comms) => {
            setComments(comms);
        });
        return () => socket.disconnect();
    }, [idItem, socket])

    const handleOnChange = (e) => {
        setComment(e.target.value)
    }

    const addComment = (e) => {

        e.preventDefault();

        if (comment === "") return;
        let dateCreate = format(new Date(), "HH:mm:ss'/'yyyy-MM-dd")
        setComments([
            ...comments,
            {
                id: uuidv4(),
                name: email,
                content: comment,
                date: dateCreate,
            }

        ]);

        let commentsArr = [...comments,
        {
            id: uuidv4(),
            name: email,
            content: comment,
            date: dateCreate,
        }]

        socket.emit("updateItemComments", {
            itemId: idItem,
            comments: commentsArr,
        });

    };

    return (
        <>
            {
                isLoading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 30 }}>
                        <CircularProgress size={60} />
                    </Box>
                    :
                    <Paper elevation={5}>
                        <StyledGrid container mt={5}>
                            <StyledGridItem item xs={6}>
                                <Item item={item} />
                            </StyledGridItem>
                            <StyledGridComments item xs={6} classes='comments'>
                                <Grid container fullWidth >
                                    <Grid item xs={12}>
                                        <Typography variant='h5' padding={1}>
                                            {messages["item.comments"]}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Comments comments={comments} />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <InputComments addComment={addComment} comment={comment} comments={comments} setComment={setComment} handleOnChange={handleOnChange} />
                                    </Grid>
                                </Grid>
                            </StyledGridComments>
                        </StyledGrid>
                    </Paper>
            }
        </>
    )
}

export default ItemPage