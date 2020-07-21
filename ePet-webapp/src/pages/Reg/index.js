import React,{useState} from 'react';
import { NavBar, Icon, Toast } from 'antd-mobile';
import { UserOutlined,HomeOutlined,AppstoreOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import MD5 from 'crypto-js/md5'
import './reg.scss';
import userApi from '@/api/user'

function Reg (props){
    const [form] = Form.useForm();
    const [isShow,show] = useState(false)

    const toPage = (path)=>{
        props.history.push(path)
    }
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
    const onFinish = async values => {
        // console.log('Received values of form: ', values);
        let name = values.username;
        // console.log(values.confirm);
        let psw = MD5(values.confirm).toString()
        // console.log(name,psw);
        try{
            let p = await userApi.userReg(name,psw);
            if(p.data.code == 200){
                Toast.success('注册成功，正在跳转至登录页', 2);
                setTimeout(()=>{
                    props.history.push('/login')
                },2000)
            }else{
                Toast.fail('注册失败', 2);
            }
        }catch(err){
            console.log(err);
        }
    };
    const checkname = async (rule, value ) => { //表单校验用户名是否存在
        try {
            let p = await userApi.checkname(value)
            if(p.data.code == 200){
                return Promise.resolve();
            }else if(p.data.code == 300){
                return Promise.reject('该用户名已存在');
            }else if(p.data.code == 5000){
                return Promise.reject('服务器出错');
            }
        } catch (err) {
            return Promise.reject('err');
        }
      }
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
                    validateFirst = {true}
                    rules={[
                    {
                        whitespace:true,
                        message: '请勿输入空格',
                    },

                    {
                        required: true,
                        message: '请输入用户名!',
                    },
                    {
                        validator: checkname
                    }
                    ]}
                    label="用户名"
                    hasFeedback
                    
                    // help="用户名已存在"
                >
                    <Input onBlur={()=>{
                        form.validateFields(['username']);
                    }}/>
                </Form.Item>
                {/* 密码 */}
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                    {
                        whitespace:true,
                        message: '请勿输入空格',
                    },
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
                        whitespace:true,
                        message: '请勿输入空格',
                    },
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