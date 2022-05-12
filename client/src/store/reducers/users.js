import { FETCH_ALL, UPDATE, DELETE, END_LOADING, START_LOADING } from '../actions/actionTypes';

const usersReducer = (state = { isLoading: true, users: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
       users: action.payload
      };
    case UPDATE:
      return { ...state, users: state.users?.map((user) => (user._id === action.payload._id ? action.payload : user)) };
    case DELETE:
      return { ...state, users: state.users?.filter((user) => user._id !== action.payload) };
    default:
      return state;
  }
};

export default usersReducer;