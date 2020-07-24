import React, { useState, useEffect ,layout} from "react"
import { Table, Button, message, Form, Input, DatePicker, Modal} from 'antd';
import orderApi from "../../api/order"

export const Eidtitem = ({ visible, onCancel, rowinfo, mark,onReset }) => {
    const [info, setinfo] = useState("")
    const [form] = Form.useForm()
    useEffect(() => {
        setinfo(rowinfo)
        if (!mark) {
            form.resetFields()
        } else {
            // console.log(rowinfo, visible, mark)
            form.setFieldsValue({
                "uid": rowinfo.uid,
                "gid": rowinfo.gid,
                "goodname": rowinfo.goodname,
                "goodqty": rowinfo.goodqty,
                "goodtitle": rowinfo.goodtitle,
                "goodprice": rowinfo.goodprice,
            })
        }
    }, [mark, form, rowinfo])
    return (
        <Modal
            getContainer={false}
            destroyOnClose={true}
            title={mark ? "修改订单":"新增订单"}
            okText="提交"
            cancelText="取消"
            visible={visible}
            onOk={() => {
                form.validateFields().then((values) =>{
                    if(mark){
                        //修改
                        let gid = values.gid
                        let ordertime = values["date-picker"]._d
                        let p = orderApi.orderlistput(values,gid,ordertime).then(res=>{
                            // console.log(res)
                        })
                        onReset()
                    }else{
                        //新增
                        // console.log(values)
                        let ordertime = values["date-picker"]._d
                        let uid = values.uid
                        let gid = values.gid
                        let p = orderApi.orderlistid(uid,gid).then(res=>{
                            if(res.data.flag){
                                message.error("商品已存在请去查询修改或重新修改")
                            }else{
                                message.success("商品不存在可以新增")
                                let p2 = orderApi.addorderlist(values,ordertime).then(res2=>{
                                    if(res2.data.flag){
                                        message.success("新增订单成功")
                                    }
                                })
                                onReset()
                            }
                        })
                    }
                }).catch(info =>{
                    // console.log(info)
                })
            }}
            onCancel={() => {
                onCancel()
                form.setFieldsValue({})
                form.resetFields()
                setinfo("")
                
            }}
        >
            <Form
                form={form}
                {...layout}
                name="basics"
            >
                <Form.Item
                    label="uid"
                    name="uid"
                    style={mark ?{display:"none"}:{display:"block"}}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="gid"
                    name="gid"
                    style={mark ?{display:"none"}:{display:"block"}}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="goodname"
                    name="goodname"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="goodprice"
                    name="goodprice"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="goodqty"
                    name="goodqty"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="goodtitle"
                    name="goodtitle"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="date-picker" label="ordertime">
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
};