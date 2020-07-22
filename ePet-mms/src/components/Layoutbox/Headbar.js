import React from 'react';
import { Layout } from 'antd';
import{withRouter} from "react-router-dom"
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

function Headbar(props){
    const user=localStorage.getItem('username')
    const loginout=function(){
        localStorage.setItem('token', "")
        localStorage.setItem('username', "")
        props.history.push('/login')
    }
    return(
        <Header className="header">
            <div className="logo" >
                <img src="http://localhost:6677/logo.jpg" />
                <span>e宠后台管理系统</span>
            </div>
            {/* 退出 */}
            <div className="logout">
                <span>{user},欢迎你！</span>
                <i className="logoutbtn" onClick={loginout}>退出<LogoutOutlined /></i>
            </div>
        </Header>
    )
}

export default  withRouter(Headbar)