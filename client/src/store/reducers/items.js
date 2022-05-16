import {  CREATE_ITEM,  DELETE_ITEM, END_LOADING, START_LOADING, FETCH_BY_ONE } from '../actions/actionTypes';

const itemsReducer = (state = { isLoading: false, items: []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_BY_ONE:
      return {
        ...state,
        items: action.payload
      };
    case CREATE_ITEM:
      return { ...state, items: [...state?.items, action.payload] };
    case DELETE_ITEM:
      return { ...state, items: state.items?.filter((items) => items._id !== action.payload) };
    default:
      return state;
  }
};

export default itemsReducer;