import * as actionTypes from "../actions/actionTypes";

const initialState={
    authError:'',
    idToken:null,
    localId:null,
    processing:false
}


const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return {...state,authError:'',idToken:null,localId:null,processing:true}
        case actionTypes.AUTH_FAILED:
            return {...state,authError:action.payload,idToken:null,localId:null,processing:false}
        case actionTypes.AUTH_SUCCESS:
            const tokens=action.payload.split("-");
            return {...state,idToken:tokens[0],localId:tokens[1],authError:'',processing:false}
        case actionTypes.AUTH_LOGOUT:
            return {...state,authError:'',idToken:null,localId:null,processing:false}
        default:
            return state;
    }
}


export default reducer;