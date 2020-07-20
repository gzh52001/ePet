import React,{useState} from 'react';
import { HomeOutlined,AppstoreOutlined,ShoppingCartOutlined,UserOutlined } from '@ant-design/icons';
import { NavBar, Icon, Picker, List, DatePicker, Button, Modal, Toast} from 'antd-mobile';
import useStorage from '@/Hook'

function Setting(props){
    const now = new Date(Date.now());
    const [isShow,show] = useState(false)
    const [sex,pickSex] = useState() //性别
    const [date,pickDate] = useState(now) //日期
    const [name,set] = useStorage('ep-username')
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
    const logOut = ()=>{
        localStorage.removeItem('ep-username')
        localStorage.removeItem('ep-uid')
        localStorage.removeItem('ep-token')
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
                    <Item extra={<img src="https://img2.epetbar.com/dogs/1.jpg"/>}>头像</Item>
                </List>
                <List className="my-list">
                    <Item extra={name}>用户名</Item>
                </List>
                {/* <Picker 
                    // data={gender} 
                    // cols={1} 
                    // value={sex}
                    // onChange={(val)=>{
                    //     pickSex(val)
                    // }}
                    className="forss">
                    <List.Item arrow="horizontal">头像
                    </List.Item>
                </Picker> */}
                <Picker 
                    data={gender} 
                    cols={1} 
                    value={sex}
                    onChange={(val)=>{
                        pickSex(val)
                    }}
                    className="forss">
                    <List.Item arrow="horizontal">性别
                    </List.Item>
                </Picker>
                <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={date}
                    onChange={date => pickDate(date)}
                    >
                    <List.Item arrow="horizontal">生日</List.Item>
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

export default Setting