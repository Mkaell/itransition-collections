import {  FETCH_ALL_ITEM_TAG,  END_LOADING, START_LOADING,} from '../actions/actionTypes';

const itemsReducer = (state = { isLoading: false, items: [],}, action) => {
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