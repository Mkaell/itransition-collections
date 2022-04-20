import { AUTH, LOGOUT } from '../actions/actionTypes.js';
import * as api from '../api/index.js';


export const actionLogIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(formData);

    dispatch({ type: AUTH, data });

   navigate('/');
  } catch (error) {
    alert(error.response.data.message)
  }
};

export const actionSignUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate('/');
  } catch (error) {
    alert(error.response.data.message)
  }
};

export const actionLogOut = () =>({type: LOGOUT})
