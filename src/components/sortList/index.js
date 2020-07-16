import React, { Component } from 'react';
import "./index.scss"
import one from '@/api/getsort'
class List extends Component {
    constructor() {
        super()
        this.state = {
            sortList: [],//列表
            goodsList: [{
                list: [],
                title: '',  
            }],//商品
            listId: 88888,//高亮id
            pet:'dog',//当前的宠物
        }
    }
    componentDidMount() {
        let {pet}=this.state
        this.getsort()
        this.getGoods(pet, 88888)
    }
    //获取商品内容
    getGoods = async (pet, id) => {
        try {
            let p = await one.getGoods(pet, id)
            this.setState({
                goodsList: p.data.cate_list
            })
        } catch (error) {
            console.log(error);
        }
    }
    //获取列表
    getsort = async () => {
        try {
            let p = await one.getSort()
            this.setState({
                sortList: p.data.categorys
            })
            this.getGoods()
        } catch (error) {
            console.log(error);
        }
    }
    //改变列表高亮
    changelist = (id) => {
        let {pet}=this.state
        this.setState({
            listId: id
        })
        this.getGoods(pet, id)
    }
    //去列表
    goList=(id)=>{
        let bba=id.split('_')[1]
        this.props.history.push({ pathname:'/GoodsList/'+bba})
       
    }
    render() {
        let { goodsList, sortList, listId } = this.state
        return (
            <div className='list'>
                {/* 列表 */}
                <ul className='one'>
                    {
                        sortList.map((item) => (
                            <li key={item.cateid} className={item.cateid == listId ? 'box' : 'id_param'} onClick={this.changelist.bind(this, item.cateid)}>{item.name}</li>
                        ))
                    }
                </ul>
                {/* 商品 */}
                <div className='two'>
                    <span>{goodsList[0].title}</span>
                    {
                        goodsList ? <div className='Goods'>

                            {
                                goodsList[0].list.map((item) => (
                                    <div key={item.name} onClick={this.goList.bind(this,item.id_param)}>
                                        <img src={item.photo} />
                                        <p>{item.name}</p>
                                    </div>
                                ))
                            }

                        </div>
                            : <div></div>
                    }
                    {/* 品牌 */}
                    {
                        goodsList[1] ? <div className='commodity'>
                             <span>{goodsList[1].title}</span>
                            {
                                goodsList[1].list.map((item) => (
                                    <div key={item.name}>
                                        <main>
                                            <img src={item.logo} />
                                        </main>
                                        <p>{item.name}</p>
                                    </div>
                                ))
                            }

                        </div>
                            : <div></div>
                    }
                </div>
            </div>
        )
    }
}
export default List