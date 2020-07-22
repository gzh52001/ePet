import React from 'react';
import { Spin } from 'antd';
import { connect } from "react-redux"

function mapStateToProps(state){
    //state：redux中的state
    return{
        show:state.isShow
    }
}

function LoadingPage(props){
    // console.log('loading',props);
    let {show} = props
    let isShow = show ? 'block' : 'none'
    return(
        <div 
            className="loading_container" 
            style={{
                width:'100vw',
                height:'100vh',
                backgroundColor:'rgba(73, 73, 73, 0.5)',
                position:'fixed',
                zIndex:100,
                display:`${isShow}`
                }}>
            <Spin size="large" style={{display:'block',margin:'250px auto'}}/>
        </div>
    )
}

LoadingPage = connect(mapStateToProps)(LoadingPage)
export default LoadingPage