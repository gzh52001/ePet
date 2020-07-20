import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, ShoppingOutlined, NotificationOutlined } from '@ant-design/icons';
import './layoutbox.scss';
import { Route,withRouter } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;

function Sidebar(props){
    const [menuKey,current] = useState('home')
    const toPage = (path)=>{
        props.history.push(path)
    }
    
    return (
        <div className="sidebar">
            <Sider width={200} className="site-layout-background">
                <Menu
                mode="inline"
                // defaultSelectedKeys={['sub1']}
                // defaultOpenKeys={['sub1']}
                selectedKeys={[menuKey]}
                style={{ height: '100%', borderRight: 0 }}
                onClick={(e)=>{
                    current(e.key)
                }}
                >
                    <Menu.Item key="home" icon={<HomeOutlined />} title="首页" onClick={()=>{
                        toPage('/app/home')
                    }}>
                        首页
                    </Menu.Item>
                    <Menu.Item key="custom" icon={<UserOutlined />} title="用户管理" onClick={()=>{
                        toPage('/app/custom')
                    }}>
                        用户管理
                    </Menu.Item>
                    <Menu.Item key="goods" icon={<ShoppingOutlined />} title="商品管理" onClick={()=>{
                        toPage('/app/goods')
                    }}>
                        商品管理
                    </Menu.Item>
                    <Menu.Item key="order" icon={<NotificationOutlined />} title="订单管理" onClick={()=>{
                        toPage('/app/order')
                    }}>
                        订单管理
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>
    )
}
Sidebar = withRouter(Sidebar)
export default Sidebar