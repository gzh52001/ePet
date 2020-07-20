import React, { Component } from 'react';
import Tabbar from '@/components/Tabbar'
import "../Home/index.scss"
import { Carousel, Tag } from 'antd';
import { SearchOutlined, MessageOutlined } from "@ant-design/icons"
import Api from "../../api/test"
import goodApi from "../../api/index"
// import { connect } from "react-redux"
// import store from "../../store"


class Home extends Component {
    constructor() {
        super()
        this.state = {
            contentClass: "ant-affix",
            shop: {},
            shoptitle: "",
            shoptitle2: "",
            shoplistes: [],
            banner: [],
            newbanner: [],
            newbanner2: [],
            newbanner3: [],
            page: 0,
            isclose: true,
            goodslist: [],
        }
        this.windowscolltop()
    }
    componentDidMount() {
        console.log(this.props)
        Api.indexlist().then(res => {
            console.log(res.data.datas.list)
            this.setState({
                shop: res.data.datas.list[8],
                shoptitle: res.data.datas.list[8].data.title,
                shoptitle2: res.data.datas.list[8].data.stateTitle,
                shoplistes: res.data.datas.list[8].data.goods,
                banner: res.data.datas.list[7].data.images,
                newbanner: res.data.datas.list[10].data.ranklist[0].list,
                newbanner2: res.data.datas.list[10].data.ranklist[1].list,
                newbanner3: res.data.datas.list[10].data.ranklist[2].list,
            })
        })
    }
    gogoods = (id) => {
        this.props.history.push("/detail/" + id)
    }
    windowscolltop = () => {
        window.onscroll = () => {
            //吸顶变色
            let h = document.documentElement.scrollTop
            if (h > 20) {
                this.setState({
                    contentClass: "ant-affixs"
                })
            } else {
                this.setState({
                    contentClass: "ant-affix"
                })
            }
            //下拉获取更多
            let i = this.state.page
            // let scrollTop = document.documentElement.scrollTop
            let heights = document.documentElement.scrollHeight
            let Clintheight = heights - h
            if (this.state.isclose && Clintheight < 800) {
                this.setState({
                    isclose: false,
                    page: this.state.page + 1
                })
                if (this.state.page - i == 1) {
                    let p = goodApi.goodslist(this.state.page).then(res => {
                        let list = []
                        let lists = this.state.goodslist
                        list = res.data.data
                        for (let i = 0; i < list.length; i++) {
                            lists.push(list[i])
                        }
                        this.setState({
                            goodslist: lists
                        })
                        if (this.state.page < 2) {
                            this.setState({
                                isclose: true
                            })
                            this.windowscolltop(this.state.page)
                        }
                    })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        }
    }
    render() {
        return (
            <div>
                <div className={this.state.contentClass}>
                    <div className="seach">
                        <div className="seach-radio" onClick={()=>{
                            this.props.history.push('/search')
                        }}>
                            <div style={{ marginTop: 5 }}>
                                <SearchOutlined style={{ marginLeft: 15, marginRight: 3 }} />
                                <span>巅峰</span>
                            </div>
                        </div>
                        <p>
                            <a>
                                <MessageOutlined className="icon-img" />
                            </a>
                        </p>
                    </div>
                    <div className="nav">
                        <div className="nav-div">
                            <ul className="nav-ul">
                                <li>
                                    <span className="nav-acitve">精选</span>
                                </li>
                                <li>
                                    <img src="https://img2.epetbar.com/2020-02/22/22/bf66e76b887663d187dbbfc9e8dcd617.png" />
                                </li>
                                <li>
                                    <a>进口狗粮</a>
                                </li>
                                <li>
                                    <a>国产狗粮</a>
                                </li>
                                <li>
                                    <a>内外驱虫</a>
                                </li>
                                <li>
                                    <a>五官护理</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <Carousel autoplay className="banner-1">
                    <div className="banner1">
                        <img src="https://img2.epetbar.com/2020-07/10/14/4c50aa5abcfc5484d62d0a600d992cc7.jpg?x-oss-process=style%2Fcut&%241=710&%242=240" />
                    </div>
                    <div className="banner2">
                        <img src="https://img2.epetbar.com/2020-07/10/13/1719a1e3f9c5a821b7ced973b8a24613.jpg?x-oss-process=style%2Fcut&%241=710&%242=240" />
                    </div>
                    <div className="banner3">
                        <img src="https://img2.epetbar.com/nowater/2020-07/13/09/e0c907cf409ec92fad540f9e240525df.jpg?x-oss-process=style%2Fcut&%241=710&%242=240" />
                    </div>
                    <div className="banner4">
                        <img src="https://img2.epetbar.com/2020-07/08/09/bd45ffec36fa4deeb16adf1aa1f49ac1.jpg?x-oss-process=style%2Fcut&%241=710&%242=240" />
                    </div>
                    <div className="banner5">
                        <img src="https://img2.epetbar.com/nowater/2020-07/01/11/1c14ce9a048b713b1b273c819af7f811.jpg?x-oss-process=style%2Fcut&%241=710&%242=240" />
                    </div>
                    <div className="banner6">
                        <img src="https://img2.epetbar.com/2020-07/10/14/4c50aa5abcfc5484d62d0a600d992cc7.jpg?x-oss-process=style%2Fcut&%241=710&%242=240" />
                    </div>
                </Carousel>
                <div className="menus">
                    <ul>
                        <li>
                            <a href="">
                                <img src="https://img2.epetbar.com/2020-06/28/16/dc6ecff0e536fef501692e6e18aab8d4.png@!water" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://img2.epetbar.com/2020-06/28/16/36062b844e2c70de612899ed80e36731.png@!water" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://img2.epetbar.com/2020-07/01/11/3a24d3eb39a4c8150336d8bfff08c244.gif" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://img2.epetbar.com/2020-06/28/16/ab5a8a6b305432c051229ebfe2c71cd7.png@!water" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://img2.epetbar.com/2020-06/28/16/756f52c2d5b51316c3e64106d88cc306.png@!water" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://img2.epetbar.com/2020-06/28/16/68c663a7e75ac7ec8fc32ac1fd6d217f.png@!water" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://img2.epetbar.com/2020-06/28/16/a021f05ab4014f305b14d4040d0267ff.png@!water" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://img2.epetbar.com/2020-06/28/16/19b252b2182cfec939f4f67e7245f324.png@!water" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://img2.epetbar.com/2020-06/28/16/98778aac17fa6574d9a46f62e56f4d34.png@!water" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src="https://img2.epetbar.com/2020-06/28/16/a47e2d3d4a9749e1841f6814ce41957a.png@!water" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="divimg">
                    <a href="http://wap.epet.com/app/orderTopic/1076"><img className="divimg-1" src="https://img2.epetbar.com/2020-07/10/17/9549c13f05b95d3e28a09973ed37bcb4.gif?x-oss-process=style/water" /></a>
                </div>
                <div className="divimg">
                    <a href="http://wap.epet.com/app/orderTopic/1076"><img className="divimg-2" src="https://img2.epetbar.com/2020-04/28/16/34567f51bb692710d01cf47ef5e76ac4.png?x-oss-process=style/water" /></a>
                </div>
                <div className="divimg">
                    <a href="http://wap.epet.com/app/orderTopic/1076"><img className="divimg-3" src="https://img2.epetbar.com/2020-05/29/15/30de9bfa1af1052a69d280658a22f07f.png?x-oss-process=style/water" /></a>
                </div>
                <div className="divimg">
                    <a href="http://wap.epet.com/app/orderTopic/1076"><img className="divimg-4" src="https://img2.epetbar.com/2020-04/10/17/bfb2556bedf271024f9da37998758f68.gif?x-oss-process=style/water" /></a>
                </div>
                <div className="shoplist">
                    <div className="shoplist-tit">
                        <div className="tit-left">
                            <img src="https://static.epetbar.com/static_wap/appmall/main/index_icon_berserk_mark_415.png?version=03" />
                        </div>
                        <div className="tit-right">
                            <span>{this.state.shoptitle}</span>
                            <h5>{this.state.shoptitle2}</h5>
                        </div>
                    </div>
                    <div className="shoplists">
                        {
                            this.state.shoplistes.map(item => (<div key={item.gid} className="lis">
                                <a href="https://wap.epet.com/surprise/Main.html?pet_type=dog&tid=18:00">
                                    <div className="shoptop">
                                        <img src={item.image.img_url} />
                                        <div className={item.discount === "" ? "" : "discount"}>{item.discount}</div>
                                    </div>
                                    <div className="shopmodel">{item.subject}</div>
                                    <div className="shopbottom">
                                        <span>¥{item.sale_price}</span>
                                        <del>¥{item.little_price}</del>
                                    </div>
                                </a>
                            </div>))
                        }
                    </div>
                </div>
                <div className="divimg">
                    <a href="http://wap.epet.com/app/orderTopic/1076"><img className="divimg-5" src="https://img2.epetbar.com/2020-03/24/15/064095dd5fdf598a93f777794ea91f87.png?x-oss-process=style/water" /></a>
                </div>
                <div className="divimg">
                    <a href="http://wap.epet.com/app/orderTopic/1076">
                        <img className="divimg-6" src="https://img2.epetbar.com/2020-07/14/18/85f2a61176be0552875705b496f21dd5.jpg?x-oss-process=style/water" />
                        <div className="divimg-left">
                            <img className="divimg-7" src="https://img2.epetbar.com/2020-07/09/20/953c9b4628985c848123c7dc37ffba8e.jpg?x-oss-process=style/water" />
                            <img className="divimg-7" src="https://img2.epetbar.com/2020-07/09/15/4375cb6329a641e6e2d4e75a9c76e6d7.jpg?x-oss-process=style/water" />
                        </div>
                    </a>
                </div>
                <Carousel className="banner-2" autoplay>
                    {
                        this.state.banner.map(item => (<div key={item.img_url}>
                            <img src={item.img_url} />
                        </div>))
                    }
                </Carousel>
                <div className="benefit">
                    <img src="https://img2.epetbar.com/2020-06/15/16/58f2f072262daccbaf8ab45a229ce8ae.png?x-oss-process=style/water" />
                    <img src="https://img2.epetbar.com/2020-04/21/11/92997ce4c477a31f1edb33c5eec49c04.png?x-oss-process=style/water" />
                </div>
                <div className="banner-3">
                    <div className="banner-top">
                        <img src="https://img2.epetbar.com/nowater/2020-03/24/15/a328fa53b956c49fcfa585574d186efb.png" />
                    </div>
                    <div className="banner-moddel">
                        <div className="newbanner-1">
                            <img className="newbannerimg" src="https://static.epetbar.com/static_wap/ranking/homePage/cate.png?version=03" />
                            <img className="newbannerimg2" src="https://static.epetbar.com/static_wap/ranking/homePage/trophy.png?version=03" />
                            <Carousel className="newbanner1" autoplay dots={false} autoplaySpeed={4000}>
                                {
                                    this.state.newbanner.map(item => (<div className="newbanner1-1" key={item.second_cate}>
                                        <div className="bannertext">
                                            <h3>{item.title}</h3>
                                            <h4>{item.subtitle}</h4>
                                        </div>
                                        <div className="bannerimg">
                                            <img src="http://img2.epetbar.com/common/upload/commonfile/2019/011/21/0105612_669585.jpg?x-oss-process=style/cut&$1=200&$2=200" />
                                            <img src="http://img2.epetbar.com/common/upload/commonfile/2019/011/21/0105612_669585.jpg?x-oss-process=style/cut&$1=200&$2=200" />
                                            <img src="http://img2.epetbar.com/common/upload/commonfile/2019/011/21/0105612_669585.jpg?x-oss-process=style/cut&$1=200&$2=200" />
                                        </div>
                                    </div>))
                                }
                            </Carousel>
                        </div>
                        <div className="newbanner-1">
                            <img className="newbannerimg" src="https://static.epetbar.com/static_wap/ranking/homePage/breed.png?version=03" />
                            <img className="newbannerimg2" src="https://static.epetbar.com/static_wap/ranking/homePage/trophy.png?version=03" />
                            <Carousel className="newbanner1" autoplay dots={false} autoplaySpeed={7000}>
                                {
                                    this.state.newbanner2.map(item => (<div className="newbanner1-1" key={item.second_cate}>
                                        <div className="bannertext">
                                            <h3>{item.title}</h3>
                                            <h4>{item.subtitle}</h4>
                                        </div>
                                        <div className="bannerimg">
                                            <img src="http://img2.epetbar.com/common/upload/commonfile/2019/011/21/0105612_669585.jpg?x-oss-process=style/cut&$1=200&$2=200" />
                                            <img src="http://img2.epetbar.com/common/upload/commonfile/2019/011/21/0105612_669585.jpg?x-oss-process=style/cut&$1=200&$2=200" />
                                            <img src="http://img2.epetbar.com/common/upload/commonfile/2019/011/21/0105612_669585.jpg?x-oss-process=style/cut&$1=200&$2=200" />
                                        </div>
                                    </div>))
                                }
                            </Carousel>
                        </div>
                        <div className="newbanner-1">
                            <img className="newbannerimg" src="https://static.epetbar.com/static_wap/ranking/homePage/custom.png?version=03" />
                            <img className="newbannerimg2" src="https://static.epetbar.com/static_wap/ranking/homePage/trophy.png?version=03" />
                            <Carousel className="newbanner1" autoplay dots={false} autoplaySpeed={9000}>
                                {
                                    this.state.newbanner3.map(item => (<div className="newbanner1-1" key={item.second_cate}>
                                        <div className="bannertext">
                                            <h3>{item.title}</h3>
                                            <h4>{item.subtitle}</h4>
                                        </div>
                                        <div className="bannerimg">
                                            <img src="http://img2.epetbar.com/common/upload/commonfile/2019/011/21/0105612_669585.jpg?x-oss-process=style/cut&$1=200&$2=200" />
                                            <img src="http://img2.epetbar.com/common/upload/commonfile/2019/011/21/0105612_669585.jpg?x-oss-process=style/cut&$1=200&$2=200" />
                                            <img src="http://img2.epetbar.com/common/upload/commonfile/2019/011/21/0105612_669585.jpg?x-oss-process=style/cut&$1=200&$2=200" />
                                        </div>
                                    </div>))
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div className="banner-bottom">
                        <a href="">
                            <div className="hotrank">
                                <div className="hotrank-left">
                                    <img src="https://static.epetbar.com/static_wap/ranking/homePage/heat.png?version=03" />
                                </div>
                                <div className="hotrank-right">
                                    <div>
                                        <img src="https://static.epetbar.com/static_wap/ranking/homePage/heatSort1.png?version=03" />
                                        <p>美毛产品要吃上7年才有效？7天就够了！</p>
                                    </div>
                                    <div>
                                        <img src="https://static.epetbar.com/static_wap/ranking/homePage/heatSort2.png?version=03" />
                                        <p>虫虫大作战！进攻~</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="goodslist">
                    <div className="text">
                        猜你喜欢
                    </div>
                    <div className="goods">
                        {
                            this.state.goodslist.map(item => (<div className="goods-list" key={item.gid} onClick={this.gogoods.bind(null, item.gid)}>
                                <div className="goodsimg">
                                    <img src={item.img_url} />
                                </div>
                                <div className="goodstext">
                                    <h3>{item.title}</h3>
                                    <Tag className="goods_properties">
                                        {item.goods_properties}
                                    </Tag>
                                    <h4>¥{item.price}</h4>
                                </div>
                            </div>))
                        }
                    </div>
                </div>
                <div className="bottom" >
                    到底了别滑动了
                </div>
                <Tabbar />
            </div>
        )
    }
}

export default Home