import React,{useState, useMemo, useEffect, useCallback} from 'react';
import { HomeOutlined,AppstoreOutlined,ShoppingCartOutlined,UserOutlined } from '@ant-design/icons';
import { NavBar, Icon, Picker, List, DatePicker, Button, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Upload, message } from 'antd';
import useStorage from '@/Hook';
import userApi from '@/api/user'
import {connect} from "react-redux"
import store from "../../store"
function Setting(props){
    const now = new Date(Date.now());
    const [uid,setUid] = useStorage('ep-uid');
    const [sex,pickSex] = useState([]) //性别
    const [userAge,pickAge] = useState([]) //年龄
    const [date,pickDate] = useState(now) //日期
    const [photo,changePhoto] = useState('') //头像
    const [name,setName] = useStorage('ep-username')
    const pushAge = useMemo(()=>{ //年龄数组
        let nl = []
        for(let i = 12; i < 66; i++){
            let obj = {
                value:i + '',
                label:i + ''
            }
            nl.push(obj)
        }
        // console.log(nl);
        return nl
    },[])
    useEffect(()=>{
        // 这里的代码在组件渲染结束后执行
        async function getUserInfo(uid){
            try{
                let p = await userApi.getUserInfo(uid)
                let { age, username, gender, avatar, feedtime} = p.data.data 
                // console.log(age, username, gender, avatar, feedtime);
                changePhoto(avatar)
                if(age){
                    pickAge([age])
                }
                if(gender){
                    pickSex([gender])
                }
                if(feedtime){
                    pickDate(new Date(feedtime))
                }
            }catch(err){
                console.log(err);
            }
        }
        getUserInfo(uid)
        
        return ()=>{
            // 这里的代码在组件被销毁后执行
        }
    },[])
    const [isShow,show] = useState(false)
    const changeInfo = useCallback( async (id,obj)=>{
        try{
            let p = await userApi.changeInfo(id,obj)
            // console.log(p.data);
        }catch(err){
            console.log(err);
        }
    },[])
    const { getFieldProps } = props.form
    const Item = List.Item;
    const alert = Modal.alert;
    const toPage = (path)=>{
        props.history.push(path)
    }
    const gender = [
        {
            value:'男',
            label:'男'
        },
        {
            value:'女',
            label:'女'
        }
    ]
    
    const uploadImg = {
        name: 'avatar',
        action: 'http://47.113.84.151:6677/upload/avatarimg',
        data: {
            uid:uid
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
            //   console.log(info.file.response.data.imgurl, info.fileList);
            }
            if (info.file.status === 'done') {
            //   message.success(`${info.file.name} file uploaded successfully`);
                Toast.success('上传成功')
                localStorage.setItem('ep-avatar',info.file.response.data.imgurl) //把新上传的图片存到本地
                changePhoto(info.file.response.data.imgurl)
            } else if (info.file.status === 'error') {
            //   message.error(`${info.file.name} file upload failed.`);
                Toast.fail('上传失败')
            }
            // console.log('res',info.event);
        }
    }

    //退出登录
    const logOut = ()=>{
        localStorage.removeItem('ep-username')
        localStorage.removeItem('ep-uid')
        localStorage.removeItem('ep-token')
        localStorage.removeItem('ep-avatar')
        store.dispatch({
            type:"clear"
        })
        Toast.info('正在退出',1)
        setTimeout(()=>{
            props.history.push('/home')
        },1000)
        
    }
    return (
        
        <div className="setting">
            {/* 头部 */}
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
                >账户管理
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
            {/* 详情 */}
            <div className="setting_detail">
                <List className="my-list">
                    <Upload {...uploadImg}>
                        <Item extra={<img src={photo}/>}>头像</Item>
                    </Upload>
                </List>
                <List className="my-list">
                    <Item extra={name}>用户名</Item>
                </List>
                <Picker 
                    data={gender} 
                    cols={1} 
                    {...getFieldProps('district3')}
                    value={sex}
                    onChange={(val)=>{
                        // console.log('sex=',val)
                        pickSex(val)
                        let obj = {
                            gender:val[0]
                        }
                        changeInfo(uid,obj)
                    }}
                    className="forss">
                    <List.Item arrow="horizontal">性别
                    </List.Item>
                </Picker>
                <Picker 
                    data={pushAge} 
                    cols={1} 
                    value={userAge}
                    onChange={(val)=>{
                        // val = val[0]
                        pickAge(val)
                        // console.log(val);
                        let obj = {
                            age:val[0]
                        }
                        changeInfo(uid,obj)
                    }}
                    className="forss">
                    <List.Item arrow="horizontal">年龄
                    </List.Item>
                </Picker>
                <DatePicker
                    mode="date"
                    title="选择日期"
                    extra="Optional"
                    value={date}
                    onChange={date => {
                        pickDate(date)
                        let obj = {
                            feedtime: date.toUTCString()
                        }
                        changeInfo(uid,obj)
                    }}
                    >
                    <List.Item arrow="horizontal">首次养宠物</List.Item>
                </DatePicker>
                
            </div>
            {/* 退出登录 */}
            <Button type="warning" className="logout" size="small"
                onClick={() =>
                    alert('退出', '亲，确认退出吗？', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确认', onPress: logOut },
                    ])
                }
                >
                退出登录
            </Button>
        </div>
    )
}

Setting = createForm()(Setting)

Setting = connect()(Setting)
export default Setting