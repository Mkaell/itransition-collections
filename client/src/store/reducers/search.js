import {  FETCH_ALL_ITEM_TAG, CREATE, UPDATE, DELETE, END_LOADING, START_LOADING, ERROR, FETCH_BY_ONE } from '../actions/actionTypes';

const itemsReducer = (state = { isLoading: false, items: [], errors: {} }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_ITEM_TAG:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};

export default itemsReducer;