import React,{Component} from 'react';
import Tabbar from '@/components/Tabbar';
import {EnvironmentOutlined,DownOutlined,MessageOutlined,FolderViewOutlined,SearchOutlined} from '@ant-design/icons';
import { Carousel } from 'antd';
import bookApi from '@/api/book';
import './book.scss'
import Articals from './Articals'


class Book extends Component{
    constructor(){
        super();
        this.state={
            advice:[
                {
                    imgurl:'https://static.epetbar.com/epet_wap_img/opgc/xms_9.png'
                },
                {
                    imgurl:'https://static.epetbar.com/epet_wap_img/opgc/xms_8.png'
                },
                {
                    imgurl:'https://static.epetbar.com/epet_wap_img/opgc/xms_7.png'
                },
                {
                    imgurl:'https://static.epetbar.com/epet_wap_img/opgc/xms_6.png'
                },
                {
                    imgurl:'https://static.epetbar.com/epet_wap_img/opgc/xms_5.png'
                },
                {
                    imgurl:'https://static.epetbar.com/epet_wap_img/opgc/xms_11.png'
                },
                {
                    imgurl:'https://static.epetbar.com/epet_wap_img/opgc/xms_3.png'
                },
                {
                    imgurl:'https://static.epetbar.com/epet_wap_img/opgc/xms_13.png'
                }
            ],
            banner:[],
            column:[],
        }
        this.getData = this.getData.bind(this)
    }
    async getData(){
        try{
            let p = await bookApi.getData(0,1)
            console.log(p.data);
            this.setState({
                banner:p.data.data.advs,
                column:p.data.data.column
            })
        }catch(err){
            console.log(err);
        }
    }
    componentDidMount(){
        this.getData()
    }
    render(){
        const {advice,banner,column} = this.state
        return(
            <div className="book">
                {/* 头部 */}
                <div className="head">
                    <div className="search_container">
                        <div>
                            <EnvironmentOutlined />
                            <i>狗狗</i>
                            <DownOutlined style={{fontSize:12}}/>
                        </div>
                        
                        <p className="search_box">
                            <SearchOutlined />
                            <input type="text" placeholder="减肥"/>
                        </p>
                        <div>
                            <FolderViewOutlined style={{fontSize:23}}/>
                            <MessageOutlined style={{fontSize:20,marginLeft:8}}/>
                        </div>
                    </div>
                    <div className="userInfo">
                        <img src="https://static.epetbar.com/epet_wap_img/opgc/zms_avatar_dog.png"/>
                        <div>
                            <h3>立即登录</h3>
                            <span>我们想要更懂你</span>
                        </div>
                    </div>
                    
                </div>
                {/* 百科 */}
                <div className="advice_container">
                    <ul className="advice">
                        {
                            advice.map(item=>{
                                return (
                                    <li className="adviceItem" key={item.imgurl}>
                                        <img src={item.imgurl}/> 
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* banner */}
                <div className="banner">
                <Carousel autoplay>
                    {
                        banner.map(item=>{
                            return (
                                <div key={item.advid} className="items">
                                    <img src={item.img_url}/>
                                </div>
                            )
                        })
                    }
                </Carousel>
                </div>
                {/* 文章 */}
                <Articals column={column}/>
                <Tabbar/>
            </div>
        )
    }
}

export default Book