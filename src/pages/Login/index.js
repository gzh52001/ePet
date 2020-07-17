import React,{Component, useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { NavBar, Icon } from 'antd-mobile';
import { UserOutlined, LockOutlined,HomeOutlined,AppstoreOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import './login.scss'
// import Tabbar from '@/components/Tabbar'
// class Login extends Component{
//     render(){
//         return(
//             <div>Login
//                 {/* <Tabbar/> */}
//             </div>
//         )
//     }
// }

function Login (props){
    const [isShow,show] = useState(false)
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };
    
    const toPage = (path)=>{
        props.history.push(path)
    }
    return (
        <div className="login">
            <NavBar
                style={{height:50}}
                mode="light"
                icon={<Icon type="left" style={{color:'#333'}}/>}
                onLeftClick={() => props.history.go(-1)}
                rightContent={[
                    <Icon key="0" type="ellipsis" style={{color:'#333'}} onClick={()=>{
                        show(!isShow)
                    }}/>,
                ]}
                >登录
            </NavBar>
             {/* 点击出现新导航 */}
            <nav style={{display:`${isShow?'block':'none'}`}}>
                <li className="navlist" onClick={()=>{toPage('/home')}}>
                    <HomeOutlined />
                    <span>首页</span>
                </li>
                <li className="navlist" onClick={()=>{toPage('/sort')}}>
                    <AppstoreOutlined />
                    <span>分类</span>
                </li>
                <li className="navlist" onClick={()=>{toPage('/cart')}}>
                    <ShoppingCartOutlined />
                    <span>购物车</span>
                </li>
                <li className="navlist" onClick={()=>{toPage('/mine')}}>
                    <UserOutlined />
                    <span>我的e宠</span>
                </li>
            </nav>
            {/* 登录框 */}
            <div className="login_box">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                        </Button>
                        &nbsp;&nbsp;Or <span className="to_reg" onClick={()=>{toPage('/reg')}}>现在注册!</span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default Login
