import { END_LOADING, FETCH_ALL_ITEM_TAG, START_LOADING } from "../actions/actionTypes";
import * as api from '../../api/index.js';

export const getItemsByTag = (searchData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.searchItemsByTag(searchData);
        console.log(data);
        dispatch({ type: FETCH_ALL_ITEM_TAG, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        alert(error)
    }
}