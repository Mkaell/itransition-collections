import { START_LOADING, END_LOADING, FETCH_ALL, CREATE, DELETE, FETCH_ALL_COL, } from '../actions/actionTypes';
import * as api from '../../api/index.js';

export const deleteCollectionDispatch = (id , userId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        await api.deleteCollection(id, userId);
        dispatch({ type: DELETE, payload: id });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createCollectionDispatch = (formData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
       const {data} =  await api.createCollection(formData);
       console.log(data);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getcollectionsDispatch = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.fetchCollections(id);
        dispatch({ type: FETCH_ALL_COL, payload: data });
        dispatch({ type: END_LOADING });
        return data
    } catch (error) {
        alert(error)
    }
}