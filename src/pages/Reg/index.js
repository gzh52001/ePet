import React,{Component,useState} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { UserOutlined,HomeOutlined,AppstoreOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import './reg.scss'

function Reg (props){
    const [isShow,show] = useState(false)
    const toPage = (path)=>{
        props.history.push(path)
    }
    // const formItemLayout = {
    //     labelCol: {
    //       xs: { span: 24 },
    //       sm: { span: 8 },
    //     },
    //     wrapperCol: {
    //       xs: { span: 24 },
    //       sm: { span: 16 },
    //     },
    // };
    const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
    };
    const [form] = Form.useForm();
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };
    return(
        <div className="reg">
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
                >注册
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
            {/* 注册框 */}
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                className="reg_form"
            >
                {/* 用户名 */}
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: '请输入用户名!',
                    },
                    ]}
                    label="用户名"
                >
                    <Input />
                </Form.Item>
                {/* 密码 */}
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                {/* 确认密码 */}
                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: '请再次输入密码!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('两次输入密码不一致！');
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout} >
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default Reg