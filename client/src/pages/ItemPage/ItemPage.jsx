import React, { useEffect, useState } from 'react'
import { CircularProgress, Grid, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { URL } from '../../api'
import Comments from './Comments'
import InputComments from './InputComments'
import Item from './Item'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { StyledGrid, StyledGridComments, StyledGridItem } from './style'
import { getItem } from '../../store/actionCreators/itemsCreator'
import { Box } from '@mui/system'
import { format } from 'date-fns'
import { useIntl } from 'react-intl'

const ItemPage = () => {

    let socket = io(URL)
    const email = useSelector(state => state?.auth?.authData?.result?.email);
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
    }, [dispatch, idItem])

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
                    <Paper elevation={8} sx={{ mt: 10 }}>
                        <StyledGrid
                            container
                            mt={5}
                            flexDirection={{ sm: 'column', md: 'row' }}
                        >
                            <StyledGridItem item xs={12} md={6}>
                                <Item item={item} />
                            </StyledGridItem>
                            <StyledGridComments item xs={12} md={6} classes='comments' mt={{ xs: 2, sm: 0 }}>
                                <Grid container fullWidth >
                                    <Grid item xs={12}>
                                        <Paper>
                                            <Typography variant='h5' padding={1}>
                                                {messages["item.comments"]}
                                            </Typography>
                                        </Paper>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Comments comments={comments} />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <InputComments
                                            addComment={addComment}
                                            comment={comment}
                                            handleOnChange={handleOnChange}
                                        />
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