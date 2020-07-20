import React, { Component } from 'react';
import Tabbar from '@/components/Tabbar'
import { NavBar, Icon,Tag, List } from 'antd-mobile'
import './index.scss'
class Search extends Component{
    constructor(){
        super()
        this.state={
            value:'',//搜索内容
            list:[
                "周期配送","原始猎食渴望118元券","【醇粹】随单赠营养膏","福摩","【伯纳天纯】买粮赠驱虫","天衡宝","巅峰","【海洋之星】随单赠美毛师","福来恩","祛泪痕","海洋之星臻越低至6.2折","爱肯拿98元券","纽顿最高省201","生鲜本能省最高直降139元","【麦德氏】买1送1","【海洋之星】随单赠营养膏"
            ]
        }
    }
    routerBack = () => {//返回一格
        this.props.history.go(-1)
    }
    changeval=()=>{//改变内容
        this.setState({
            value:this.context.value
        })
    }
    golist=(val)=>{//去商品列表
        let {value}=this.state
        this.props.history.push({ 
            pathname:'/GoodsList/0',
            search:'?'+val||value
        })
    }
    enter=(e)=>{//回车触发
        if(e.nativeEvent.keyCode === 13){
            this.golist();
          }
    }
    render(){
        let {value,list}=this.state
        return(
            <div>
                  {/* 头部 */}
                  <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.routerBack}
                    rightContent={[
                        <button key={1} onClick={this.golist} style={{
                            border:'none',
                            borderRadius:'10%'
                        }}>搜索</button>,
                    ]}
                ><input type='text' placeholder='请输入要搜索的内容' ref={(ele)=>{
                    this.context=ele
                }} value={value} onChange={this.changeval} onKeyUp={this.enter}></input>
                </NavBar>
                <div className='tab'>
                    {list.map((item,index)=>(
                        <button onClick={this.golist.bind(this,item)} key={index}>{item}</button>
                    ))}
               
                </div>
                <Tabbar></Tabbar>
            </div>
        )
    }
}
export default Search