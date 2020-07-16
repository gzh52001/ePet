import React, { Component } from 'react';
import Tabbar from '@/components/Tabbar'
import {Route,Redirect} from 'react-router-dom'
import List from '@com/sortList'
import Brand from '@com/Brand'
import { NavBar, Icon } from 'antd-mobile'
import './index.scss'

class Sort extends Component {
    constructor(){
        super()
        this.state={
            num:1,//控制头样式的改变
        }
    }
    changeRoute=(num)=>{//点击分类和品牌时跳转
        this.setState({
            num,
        })
        if(num){//分类
            this.props.history.push('/sort/List')
        }else{//品牌
            this.props.history.push('/sort/brand')
        }
    }
    render() {
        return (
            <div>
                {/* 表头 */}
                <NavBar
                    mode="light"
                   /*  onLeftClick={() => console.log('onLeftClick')} */
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    ]}
                >
                    <button className={this.state.num==1? 'first':'second'} onClick={this.changeRoute.bind(this,1)}>分类</button>
                    <button  className={this.state.num==0? 'first':'second'} onClick={this.changeRoute.bind(this,0)}>品牌</button>    
                </NavBar>
                {/* 页面路由 */}
                <Route path='/sort/list' component={List}></Route>
                <Route path='/sort/brand' component={Brand}></Route>
                <Redirect from="/sort" to='/sort/list'></Redirect>
                <Tabbar />
            </div>
        )
    }
}

export default Sort