import React from 'react';
import Modal from '../Modal/Modal';

const ErrorHandler=(WrappedComponent,axios)=>{
    return class extends React.Component{

        state={
            error:null
        }

        componentWillMount(){
            axios.interceptors.request.use((request,err)=>{
                this.setState({error:null});
                return request;
            })
            axios.interceptors.response.use((response,err)=>{
                this.setState({error:err});
                return response;
            })
        }
        clearErrorHandler=()=>{
            this.setState({error:null});
        }
        render(){
            return (
                <>
                <Modal show={this.state.error!=null} clicked={this.clearErrorHandler}>
                    something didn't work
                </Modal>
                <WrappedComponent {...this.props} />
                </>
            );
        }
    }
}


export default ErrorHandler;