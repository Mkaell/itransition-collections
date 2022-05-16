import { START_LOADING, END_LOADING,  DELETE_ITEM,  FETCH_BY_ONE } from '../actions/actionTypes';
import * as api from '../../api/index.js';
import { format } from 'date-fns';


export const deleteItem = (id, collectionId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        await api.deleteItem(id, collectionId);
        dispatch({ type: DELETE_ITEM, payload: id });
        dispatch({ type: END_LOADING });
    } catch (error) {
       alert(error);
    }
};

export const getItem = (searchData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.fetchItem(searchData);
        
        const date = format(new Date(data.dateCreate), "HH:mm:ss'/'yyyy-MM-dd")
       
        dispatch({ type: FETCH_BY_ONE, payload: {...data, dateCreate: date} });
        dispatch({ type: END_LOADING });
        return data       
    } catch (error) {
        alert(error)
    }
}