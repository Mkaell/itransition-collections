import {  FETCH_ALL_COLL, CREATE_COLL, UPDATE_COLL, DELETE_COLL, END_LOADING, START_LOADING } from '../actions/actionTypes';

const collectionsReducer = (state = { isLoading: false, collections: []}, action) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, isLoading: true };
		case END_LOADING:
			return { ...state, isLoading: false };
		case FETCH_ALL_COLL:
			return {
				...state,
				collections: action.payload
			};
		case CREATE_COLL:
			return { ...state, collections: [...state?.collections, action.payload] };
		case UPDATE_COLL:
			return { ...state, collections: state?.collections?.map((collection) => (collection._id === action.payload._id ? action.payload : collection)) };
		case DELETE_COLL:
			return { ...state, collections: state?.collections?.filter((collection) => collection._id !== action.payload) };
		default:
			return state;
	}
};

export default collectionsReducer;