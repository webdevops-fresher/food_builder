import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { logout } from '../../store/actions/authActions';


function Logout(){

    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(logout());
    },[]);

    return (
        <div>
            <Redirect to="/" />
        </div>
    );
}



export default Logout;