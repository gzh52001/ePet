import React, { Component } from 'react';
import one from '@/api/user-mms'
import { Form, Input, Button, Checkbox, message } from 'antd';
import './index.scss'
class Login extends Component {
    constructor() {
        super()
        this.state = {
            layout: {
                labelCol: { span: 6 },
                wrapperCol: { span: 16 },
            },
            tailFormItemLayout: {
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
            }
        }
    }
    onFinish = (val) => {
        let {username,password,remember}=val
        this.login(username,password,remember)
    }
    login = async (username, userpass, keep) => {
        try {
            let p = await one.userLogin(username, userpass, keep)
            localStorage.setItem('token', p.data.data.token)
            localStorage.setItem('username', p.data.data.username)
            if (p.data.flag) {
                this.props.history.push({
                    pathname: '/app',
                })
            }else{
                message.error('登录失败，如有问题请找客服！')
            }
        } catch (error) {
            console.log(error);
        }
    }
    onFinishFailed = (val) => {
        message.error('登录失败，如有问题请找客服！')
    }
    render() {
        let { tailFormItemLayout, layout } = this.state
        return (
            <div className='bigerBox'>
                <div className='bigBox'>
                    <h1>
                        后台管理系统
                    </h1>
                    <Form
                        {...layout}
                        name="basic"
                        /* initialValues={{ remember: true }} */
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' },
                            { whitespace: true, message: '请勿输入空格', },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' },
                            { pattern: /^[a-zA-Z]\w{5,15}/, message: '请输入位字母开头6到16位密码!' },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout} name="remember" valuePropName="checked">
                            <Checkbox>7天免登录</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Login