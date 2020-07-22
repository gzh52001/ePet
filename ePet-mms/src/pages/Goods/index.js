import React, { Component } from 'react';
import { Table, Space, Input, Button, Modal, Form,message} from 'antd';
import './index.scss'
import { AudioOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import one from '@/api/goods-mms'
let { Search } = Input;

const { confirm } = Modal;
class Goods extends Component {
    constructor() {
        super()
        this.state = {
            columns: [//列表头
                {
                    title: '商品id',
                    dataIndex: 'Id',
                    key: 'Id',
                },
                {
                    title: '商品名字',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '商品价格',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '商品图片',
                    dataIndex: 'images',
                    key: 'images',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <button className='boxbutton' onClick={this.changeform.bind(this,2,record)}>修改</button>
                            <Button onClick={this.remove.bind(this, record.Id)} type="dashed">删除</Button>
                        </Space>
                    ),
                },
            ],
            GoodsList: [//商品数据
            ],
            layout: {//表格分配
                labelCol: { span: 6 },
                wrapperCol: { span: 16 },
            },
            tailFormItemLayout: {//按钮分配
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
            },
            value:{//表单默认值
                text:'',
                name:'',
                price:'',
                images:'',
            },
            openform:false,//表单的开启关闭
            type:1,//表单添加修改，1为添加，2为修改
            page:1,//当前页码
            putID:0,//修改的ID
            total:0,//条数
        }
    }
    componentDidMount(){
        this.getgoods(1)
    }
    getgoods=async (page)=>{//查询数据
        try{
            let p=await one.getgood(page)
            console.log(p);
            if(p.data.flag){
                let arr=[]
                p.data.data.map((item,index)=>{
                    item.key=index
                    arr.push(item)
                })
                this.setState({
                    GoodsList:arr,
                    total:p.data.total
                })
            }
        }catch(error){
            console.log(error);
            message.warning('服务器出错')
        }
    }
    changeform = (num,item) => {//打开和关闭表单
        if(num==0){
            this.setState({
                openform:false
            })
        }else if(num==1){
            this.setState({
                openform:true,
                type:1,
                value:{
                    text:'添加',
                    name:'',
                    price:'',
                    images:''
                },
            })
        }else if(num==2){
            this.setState({
                openform:true,
                putID:item.Id,
                type:2,
                value:{
                    text:'修改',
                    name:item.name,
                    price:item.price,
                    images:item.images
                },
            })
        }
    }
    searchValue=(val)=>{//搜索
        let va=val*1
        if(va){
            this.serchgood(val,'')
        }else{
            this.serchgood('',val)
        }
    }
    serchgood=async (id,name)=>{//搜索
        try{
            let p=await one.search(id,name)
            if(p.data.flag){
                message.success('查询成功')
                let arr=[]
                p.data.data.map((item,index)=>{
                    item.key=index
                    arr.push(item)
                })
                this.setState({
                    GoodsList:arr,
                    total:p.data.total
                })
                
            }else{
                message.warning('查询失败')
            }
        }catch(error){
            console.log(erroe);
            message.warning('服务器出错')
        }
    }
    remove = (id) => {//删除表单
        let{page}=this.state
        let a=this.getgoods
        confirm({
            title: '警告',
            icon: <ExclamationCircleOutlined />,
            content: '你确定删除吗，将无法撤回！',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            async onOk() {
                try{
                    let p=await one.delgood(id)
                    if(p.data.flag){
                        message.success('删除成功')
                       a(page)
                    }else{
                        message.warning('删除失败')
                    }
                }catch(error){
                    console.log(error);
                    message.warning('服务器出错')
                }
            },
            onCancel() {
            },
        });
    }
    onFinish=(val)=>{//点击添加或修改
        let {type}=this.state
        if(type==1){
            this.addgood(val)
        }else if(type==2){
            this.changegood(val)
        }
    }
    changegood=async (val)=>{//修改
        let{page,putID}=this.state
        console.log(val);
        try{
            let p=await one.changegood(putID,val)
            if(p.data.flag){
                message.success('修改成功')
                this.setState({
                    openform:false
                }) 
                this.getgoods(page)
            }else{
                message.warning('修改失败')
            }
        }catch(error){
            console.log(error);
            message.warning('服务器出错')
        }
    }
    addgood=async (val)=>{//添加商品
        let{page}=this.state
        try{
            let p=await one.addgood(val)
            if(p.data.flag){
                message.success('添加成功')
                this.setState({
                    openform:false
                }) 
                this.getgoods(page)
            }else{
                message.warning('添加失败')
            }
        }catch(error){
            console.log(error);
            message.warning('服务器出错')
        }
    }
    onFinishFailed=()=>{//输入规格不正确的时候
        message.warning('请正确输入信息');
    }
    changePage=(page)=>{//改变页码
       this.setState({
           page
       })
       this.getgoods(page)
    }
    render() {
        let { columns, GoodsList,layout,tailFormItemLayout,value,openform,total} = this.state
        return (
            <div className="goods">
                <Search
                    placeholder="输入商品Id或名字"
                    onSearch={this.searchValue.bind(this)}
                    style={{ width: "400px", borderRadius: "10px", marginLeft: '20px', marginBottom: '10px' }}
                />
                <Button className='add'type="primary" onClick={this.changeform.bind(this,1)}>添加</Button>
                <Table columns={columns} dataSource={GoodsList} size="small" pagination={{ total: total ,onChange:this.changePage}} />
                {
                    openform?<div className="formfater">
                     <div className='formlist'>
                    <h2>{value.text}信息</h2>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{name:value.name,price:value.price,images:value.images}}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="商品名称"
                            name="name"
                            rules={[{ required: true, message: '请输入内容!' },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="商品价格"
                            name="price"
                            rules={[{ required: true, message: '请输入内容!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="商品图片"
                            name="images"
                            rules={[{ required: true, message: '请输入内容!' },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                {value.text}
                            </Button>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <Button type="primary" onClick={this.changeform.bind(this,0)}>
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                </div>:''
                }
               
            </div>
        )
    }
}
export default Goods