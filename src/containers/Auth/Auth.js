import React from 'react';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';


import './Auth.css';
import * as actions from '../../store/actions/authActions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends React.Component{

   state={
       email:'',
       password:'',
       authMethod:'signUp'
   }

   onEmailChange=(e)=>{
       this.setState({email:e.target.value});
   }

   onPasswordChange=(e)=>{
       this.setState({password:e.target.value});
   }


   submitHandler=(e)=>{
       e.preventDefault();
       this.props.onAuth(this.state.email,this.state.password,this.state.authMethod);
   }

   switchAuthMethod=(e)=>{
       e.preventDefault();
       this.setState(previousState=>{
           if(previousState.authMethod==='signUp'){
               return {authMethod:'signIn'}
           }else{
               return {authMethod:'signUp'}
           }
       })
   }


    render(){
        let content=( <form onSubmit={this.submitHandler}>
            <div>
                <label>email</label>
                <input type="text" placeholder="email" value={this.state.email} onChange={this.onEmailChange}/>
                <label>password</label>
                <input type="password" placeholder="password" value={this.state.password} onChange={this.onPasswordChange}/>
                <button>{this.state.authMethod==='signUp'?'SignUp':'signIn'}</button>
                <button onClick={this.switchAuthMethod}>Switch Login/Sign up</button>
            </div>
        </form>);
        let error=null;
        if(this.props.processing){
            content=<Spinner/>;
        }
        if(this.props.error.length>0){
            error=this.props.error;
        }
        if(this.props.token!=null){
            content=<Redirect to="/" />
        }
        return (
            <div className="Auth">
               {content}
               {error}
            </div>
        );
    }
}



const mapStateToProps=state=>{
    return {
        processing:state.auth.processing,
        error:state.auth.authError,
        token:state.auth.idToken
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAuth:(email,password,authMethod)=>dispatch(actions.auth(email,password,authMethod))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth);

