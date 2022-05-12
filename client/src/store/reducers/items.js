import {  FETCH_ALL_ITEM_TAG, CREATE, UPDATE, DELETE, END_LOADING, START_LOADING, ERROR, FETCH_BY_ONE } from '../actions/actionTypes';

const itemsReducer = (state = { isLoading: false, items: [], errors: {} }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case ERROR:
      return { ...state, errors: action.payload};
    case FETCH_ALL_ITEM_TAG:
      return {
        ...state,
        items: action.payload
      };
    case FETCH_BY_ONE:
      return {
        ...state,
        items: action.payload
      };
    case CREATE:
      return { ...state, items: [...state?.items, action.payload] };
    case UPDATE:
      return { ...state, items: state.items?.map((items) => (items._id === action.payload._id ? action.payload : items)) };
    case DELETE:
      return { ...state, items: state.items?.filter((items) => items._id !== action.payload) };
    default:
      return state;
  }
};

export default itemsReducer;