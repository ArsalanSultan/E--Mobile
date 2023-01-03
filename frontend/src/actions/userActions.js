import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstant";
//login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/v1/login",
      { email, password },
      config
    );

    const { accessToken } = data;
    // console.log(accessToken)

    localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem('user',JSON.stringify(user))

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("api/v1/register", userData, config);

    const { accessToken } = data;
    // console.log(accessToken)

    localStorage.setItem("accessToken", accessToken);
    //localStorage.setItem('user',JSON.stringify(user))

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data, //.user
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// load user
export const loadUser = () => async (dispatch) => {
  // console.log("Load user =", )
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const token = localStorage.getItem("accessToken");
    // console.log(token)
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };

    // console.log("config ===", config)
    const { data } = await axios.get("api/v1/me", config);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//logout user
export const logout = () => async (dispatch) => {
  try {
    // localStorage.clear();
    localStorage.removeItem("accessToken");
    window.location.reload();

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
