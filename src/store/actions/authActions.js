import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken,localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: idToken+"-"+localId,
  };
};

export const authFailed = (err) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: err,
  };
};

export const auth = (email, password,authMethod) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
    };
    let baseURL="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8DEhxHb9aAJQqhRvqGLasMjtMDLBhEoo";
    if(authMethod==='signIn'){
      baseURL="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8DEhxHb9aAJQqhRvqGLasMjtMDLBhEoo"
    }
      axios
      .post(
        baseURL,
        authData
      )
      .then((response) => {
        localStorage.setItem('idToken',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);
        dispatch(authSuccess(response.data.idToken,response.data.localId));
        dispatch(logoutAfterExpiration());
      })
      .catch((err) => {
        dispatch(authFailed(err.response.data.error.message));
      });
  };
};



const logoutAfterExpiration=()=>{
  return async dispatch=>{
    window.setTimeout(()=>{
      localStorage.removeItem('idToken');
      dispatch(logout());
    },3600*1000);
  }
}


export const logout=()=>{
  localStorage.removeItem('idToken');
  localStorage.removeItem('userId');
  return {
    type:actionTypes.AUTH_LOGOUT
  }
}