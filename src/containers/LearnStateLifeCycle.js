import React from 'react';


class LearnStateLifeCycle extends React.PureComponent{

    constructor(props){
        super(props);
        this.state={}
    }

    static getDerivedStateFromProps(props,state){
        console.log('>>getDerivedStateFromProps',props,state);
        return state;
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log('>>>shouldComponentUpdate',nextProps,nextState);
        return true;
    }

    getSnapshotBeforeUpdate(prevProps,prevState){
        console.log('>>>getSnapshotBeforeUpdate',prevProps,prevState);
    }

    componentDidUpdate(prevProps,prevState,snapshot){
        console.log('>>>componentDidUpdate',prevProps,prevState);
    }

    componentDidMount(){
        console.log('>>>componentDidMount');
    }

    render(){
        console.log('>>>render');
        return (
            <div>
                {this.props.name}
            </div>
        )
    }
}


export default LearnStateLifeCycle;