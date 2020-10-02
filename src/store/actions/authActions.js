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
        dispatch(authSuccess(response.data.idToken,response.data.localId));
        dispatch(logoutAfterExpiration(response.data.expiresIn));
      })
      .catch((err) => {
        console.log('>>>>auth error',err.response);
        dispatch(authFailed(err.response.data.error.message));
      });
  };
};



const logoutAfterExpiration=(expiresIn)=>{
  return async dispatch=>{
    setTimeout(()=>{
      dispatch(logout());
    },expiresIn*1000);
  }
}


export const logout=()=>{
  return {
    type:actionTypes.AUTH_LOGOUT
  }
}