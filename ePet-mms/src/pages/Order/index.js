import React, { Component } from 'react';
import { Table, Button, message, Form, Input, DatePicker, Modal } from 'antd';
import orderApi from "../../api/order"
import "./index.scss"
import { Eidtitem } from "./eidt"

let data = [];
        orderApi.getorder().then(res => {
            // console.log(res)
            for (let i = 0; i < res.data.data.length; i++) {
                data.push({
                    key: i + 1,
                    uid: res.data.data[i].uid,
                    gid: res.data.data[i].gid,
                    goodname: res.data.data[i].goodname,
                    goodqty: res.data.data[i].goodqty,
                    goodtitle: res.data.data[i].goodtitle,
                    goodprice: res.data.data[i].goodprice,
                    ordertime: res.data.data[i].ordertime,
                });
            }
        })
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
class Order extends Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                    title: 'uid',
                    dataIndex: 'uid',
                    width: 80,
                },
                {
                    title: 'gid',
                    dataIndex: 'gid',
                    width: 100,
                },
                {
                    title: 'goodname',
                    dataIndex: 'goodname',
                },
                {
                    title: 'goodqty',
                    dataIndex: 'goodqty',
                    width: 100
                },
                {
                    title: 'goodtitle',
                    dataIndex: 'goodtitle',
                },
                {
                    title: 'goodprice',

                    dataIndex: 'goodprice',
                },
                {
                    title: 'ordertime',
                    dataIndex: 'ordertime',
                },
                {
                    title: 'aciton',
                    ket: "action",
                    render: (text, record) => (
                        <span>
                            <Button type="primary" onClick={this.eidt.bind(null, record)}>修改</Button>
                            <Button type="primary" style={{backgroundColor:'red',border:'0'}} onClick={this.removeritem.bind(null, record)}>删除</Button>
                        </span>
                    ),
                },
            ],
            datas: [],
            total: 0,
            mark: false,
            visible: false,
        }
    }

    componentDidMount() {
        
        this.setState({
            datas: data,
            total: data.length,
        })
    }
    //查询成功传入数据
    onFinish = values => {
        console.log(values)
        if (values.gid == undefined && values.uid == undefined) {
            message.error('uid,gid不能为空')
        } else {
            let gid = values.gid
            let uid = values.uid
            orderApi.orderlistid(uid, gid).then(res => {
                console.log(res)
                if (res.data.flag) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i] = {
                            ...res.data.data[i],
                            key: i + 1
                        }
                    }
                    this.setState({
                        datas: res.data.data,
                        total: res.data.data.length
                    })
                } else {
                    orderApi.getorder().then(res => {
                        // console.log(res)
                        for (let i = 0; i < res.data.data.length; i++) {
                            data.push({
                                key: i + 1,
                                uid: res.data.data[i].uid,
                                gid: res.data.data[i].gid,
                                goodname: res.data.data[i].goodname,
                                goodqty: res.data.data[i].goodqty,
                                goodtitle: res.data.data[i].goodtitle,
                                goodprice: res.data.data[i].goodprice,
                                ordertime: res.data.data[i].ordertime,
                            });
                        }
                    })
                    this.setState({
                        datas: data,
                        total: data.length,
                    })
                }
            })

        }
    };
    //重置数据跟查询
    onReset = () => {
        orderApi.getorder().then(res => {
            // console.log(res)
            let data = []
            for (let i = 0; i < res.data.data.length; i++) {
                data.push({
                    key: i + 1,
                    uid: res.data.data[i].uid,
                    gid: res.data.data[i].gid,
                    goodname: res.data.data[i].goodname,
                    goodqty: res.data.data[i].goodqty,
                    goodtitle: res.data.data[i].goodtitle,
                    goodprice: res.data.data[i].goodprice,
                    ordertime: res.data.data[i].ordertime,
                });
            }
            this.setState({
                datas: data,
                total: data.length,
                visible: false
            })
        })
    };
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    //修改订单
    eidt = (record) => {
        // console.log(record)
        this.setState({
            visible: true,
            rowinfo: record,
            mark: true
        });

    }
    //删除订单
    removeritem = async (text) => {
        let uid = text.uid
        let gid = text.gid
        try {
            let p = await orderApi.orderremove(uid, gid)
            if (p.data.flag) {
                message.success('删除成功');
                let p2 = orderApi.getorder().then(res => {
                    let data = []
                    for (let i = 0; i < res.data.data.length; i++) {
                        data.push({
                            key: i + 1,
                            uid: res.data.data[i].uid,
                            gid: res.data.data[i].gid,
                            goodname: res.data.data[i].goodname,
                            goodqty: res.data.data[i].goodqty,
                            goodtitle: res.data.data[i].goodtitle,
                            goodprice: res.data.data[i].goodprice,
                            ordertime: res.data.data[i].ordertime,
                        });
                    }
                    this.setState({
                        datas: data,
                        total: data.length
                    })
                })
            } else {
                message.error('删除失败');
            }
        } catch (err) {
            console.log(err)
        }
    }
    onCreate = () => {
        this.setState({
            visible: false
        })
    };
    //新增订单
    addodrder = () => {
        this.setState({
            visible: true,
            rowinfo: "",
            mark: false
        })
    }
    render() {
        return (
            <div className="order">
                <Form
                    ref={this.formRef}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="uid"
                        name="uid"
                        style={{width:150,height:40,marginRight:30}}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="gid"
                        name="gid"
                        style={{width:150,height:40,marginRight:30}}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button htmlType="button" onClick={this.onReset}>
                            重置
                        </Button>
                        <Button htmlType="button" onClick={this.addodrder}>
                            新增
                        </Button>
                    </Form.Item>
                </Form>
                <Table columns={this.state.columns} dataSource={this.state.datas} pagination={{
                    pageSizeOptions: [10, 20, 30, 40],
                    showQuickJumper: true,
                    total: this.state.total,
                    showTotal: total => `Total ${total} items`
                }} scroll={{ y: 650 }} />
                <Eidtitem
                    visible={this.state.visible}
                    onReset={this.onReset}
                    onCancel={() => {
                        this.setState({ visible: false })
                    }}
                    rowinfo={this.state.rowinfo}
                    mark={this.state.mark}
                />

            </div>
        )
    }
}
export default Order