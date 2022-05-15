import { LOCAL_STORAGE } from '../../utils/constants';
import {AUTH, LOGOUT} from '../actions/actionTypes';

const initialState = {
    authData:JSON.parse(localStorage.getItem(LOCAL_STORAGE.PROFILE))
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem(LOCAL_STORAGE.PROFILE, JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;