import {  FETCH_ALL_COL, CREATE, UPDATE, DELETE, END_LOADING, START_LOADING, ERROR } from '../actions/actionTypes';

const collectionsReducer = (state = { isLoading: false, collections: [], error: {} }, action) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, isLoading: true };
		case END_LOADING:
			return { ...state, isLoading: false };
		case ERROR:
			return { ...state, error: action.payload};
		case FETCH_ALL_COL:
			return {
				...state,
				collections: action.payload
			};
		case CREATE:
			return { ...state, collections: [...state.collections, action.payload] };
		case UPDATE:
			return { ...state, collections: state.collections?.map((collection) => (collection._id === action.payload._id ? action.payload : collection)) };
		case DELETE:
			return { ...state, collections: state.collections?.filter((collection) => collection._id !== action.payload) };
		default:
			return state;
	}
};

export default collectionsReducer;