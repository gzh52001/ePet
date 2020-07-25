import React,{ useState, useEffect, useCallback} from 'react';
import { Table, Input, Form, message, Select, Button, Modal } from 'antd';
import userApi from '@/api/custom';
import './custom.scss'

function Custom(props){
    const [form] = Form.useForm();
    const [data,setData] = useState([]);
    const [visible,isShow] = useState(false);
    const [uid,setUid] = useState('')
    const [username,setUsername] = useState('')
    const [datalist,changeData] = useState('')
    useEffect(()=>{
        async function getUserList(){
            try{
                let p = await userApi.getUserList()
                if(p.data.code == 200){
                    let arr = p.data.data
                    arr.map(item=>{
                        if(item.feedtime){
                            item.feedtime = new Date(item.feedtime).toLocaleDateString()
                        }
                        item.key = item.uid
                        return item
                    })
                    setData(arr)
                }else if(p.data.code == 300){
                    message.info('查询失败')
                }else{
                    message.info('服务器出错')
                }
            }catch(err){
                console.log(err);
            }
        }

        getUserList()
    },[datalist])

    const { Option } = Select;

    // 点击搜索
    const onFinish = async values => { 
        let obj = {}
        for (let key in values){
            if(values[key]){
                obj[key] = values[key]
            }
        }
        try{
            let p = await userApi.searchUser(obj)
            if(p.data.code == 200){
                let arr = p.data.data
                arr.map(item=>{
                    if(item.feedtime){
                        item.feedtime = new Date(item.feedtime).toLocaleDateString()
                    }
                    item.key = item.uid
                    return item
                })
                setData(arr)
            }else if(p.data.code == 300){
                message.info('该用户不存在')
            }else{
                message.info('服务器出错')
            }
        }catch(err){
            console.log(err);
        }
        
    };

    // 删除用户
    const removeUser = (id,name) =>{
        setUid(id)
        setUsername(name)
        isShow(true)
    }

    const deleteUser = useCallback( async (id)=>{
        try{
            let p = await userApi.removeUser(id)
            if(p.data.code == 200){
                message.success('删除成功')
            }else if(p.data.code == 300){
                message.error('删除失败')
            }else{
                message.error('服务器出错')
            }
        }catch(err){
            console.log(err);
        }
    })

    // 删除确认对话框
    const handleOk = () => {
        deleteUser(uid)
        isShow(false)
        changeData('改变了') //重新获取数据，刷新
      };
    
    const handleCancel = () => {
        isShow(false)
    };

    // 表格内容
    const columns = [
        {
            title: '序号',
            dataIndex: 'uid',
            key: 'order',
            width: 30,
            render: (text,record,index) =>{
                return <span>{index+1}</span>
            },
            fixed: 'left',
        },
        
        {
          title: '用户名',
          width: 50,
          dataIndex: 'username',
          key: 'name',
        },
        {
            title: '用户id',
            dataIndex: 'uid',
            key: 'id',
            width: 30,
        },
        {
          title: '年龄',
          width: 30,
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '性别',
          dataIndex: 'gender',
          key: 'gender',
          width: 30,
        },
        {
          title: '首次养宠物',
          dataIndex: 'feedtime',
          key: 'feedtime',
          width: 40,
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          key: 'avatar',
          width: 50,
          render: (text,record,index) => {
            return <img src={text} style={{width:40,height:40}}/>
        }
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 60,
          render: (text,record,index) => {
              let id = record.uid
              let name = record.username
              return (
                <div>
                    <Button type="primary" danger onClick={()=>{
                        removeUser(id,name)
                    }}>删除</Button>
                </div>
              )
          },
        },
    ];

    return (
        <div className="custom">
            <Form
                form={form}
                name="advanced_search"
                className="search-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="uid"
                    label = "用户id"
                    rules={[
                    {
                        whitespace: true,
                        message: '请勿输入空格',
                    },
                    ]}
                >
                    <Input placeholder="请输入用户id" style={{width:120}} />
                </Form.Item>
                <Form.Item
                    name="username"
                    label = "用户名"
                    rules={[
                    {
                        whitespace: true,
                        message: '请勿输入空格',
                    },
                    ]}
                >
                    <Input placeholder="请输入用户名" style={{width:120}} />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label = "性别"
                >
                    <Select
                        placeholder="请选择性别"
                        allowClear
                        style={{width:120}}
                    >
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                    <Button htmlType="button" onClick={() => {
                        form.resetFields();
                        changeData('改变')
                    }}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
            <Table 
                columns={columns} 
                dataSource={data} 
                scroll={{ x: 1000, y: 320 }} 
                bordered
                size="middle"
            />

            {/* 删除用户对话框 */}
            <Modal
                title="删除用户"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="取消"
                okText="确认"
                okType="primary"
                style={{textAlign:'center'}}
                width={320}
                >
                <p>确认删除该用户“&nbsp;<span>{username}</span>&nbsp;”吗？</p>
            </Modal>
        </div>
    )
}

export default Custom