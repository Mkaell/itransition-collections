import { START_LOADING, END_LOADING, CREATE, DELETE, FETCH_ALL_ITEM_TAG, ERROR, FETCH_BY_ONE } from '../actions/actionTypes';
import * as api from '../../api/index.js';
import { format } from 'date-fns';


export const deleteItem = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        await api.deleteItem(id);
        dispatch({ type: DELETE, payload: id });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getItemsByTag = (searchData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.searchItemsByTag(searchData);
        dispatch({ type: FETCH_ALL_ITEM_TAG, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        alert(error)
    }
}

export const getItem = (searchData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.fetchItem(searchData);
        console.log(data);
        const date = format(new Date(data.dateCreate), "HH:mm:ss'/'yyyy-MM-dd")
        dispatch({ type: FETCH_BY_ONE, payload: {...data, dateCreate: date} });

        dispatch({ type: END_LOADING });
        return data       
    } catch (error) {
        alert(error)
    }
}