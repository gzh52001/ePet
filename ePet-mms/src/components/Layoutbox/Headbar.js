import React from 'react';
import { Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

function Headbar(){
    return(
        <Header className="header">
            <div className="logo" >
                <img src="http://localhost:6677/logo.jpg" />
                <span>e宠后台管理系统</span>
            </div>
            {/* 退出 */}
            <div className="logout">
                <span>xxx,欢迎你！</span>
                <i className="logoutbtn">退出<LogoutOutlined /></i>
            </div>
        </Header>
    )
}

export default Headbar