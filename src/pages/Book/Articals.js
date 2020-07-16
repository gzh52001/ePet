import React,{Component} from 'react';
import { Tabs } from 'antd-mobile';
import bookApi from '@/api/book';
import {EyeOutlined,StarOutlined} from '@ant-design/icons'

class Articals extends Component{
    constructor(){
        super();
        this.state={
            articalList:[],
            isBottom:false,
            page:1,
            id:0,
        }
        this.getList = this.getList.bind(this)
        this.change = this.change.bind(this)
        this.checkScroll = this.checkScroll.bind(this)
    }

    async getList(id,page){
        try{
            let p = await bookApi.getData(id,page)
            console.log("getlist",p.data.data.list);
            this.setState({
                articalList : p.data.data.list.filter(item=>item.type!=3)
            })
            // if(articalList.length){
            //     this.setState({
            //         articalList : articalList.push(p.data.data.list.filter(item=>item.type!=3))
            //     })
            // }else{
            //     this.setState({
            //         articalList : p.data.data.list.filter(item=>item.type!=3)
            //     })
            // }
            
        }catch(err){
            console.log(err);
        }
    }

    // 监听滚动条
    checkScroll() {
        let {id,page} = this.state
        window.onscroll = () => {
          // 变量 scrollTop 是滚动条滚动时, 距离顶部的距离
          var scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          // 变量 windowHeight 是可视区的高度
          var windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
          // 变量 scrollHeight 是滚动条的总高度
          var scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight;
          // 滚动条到底部的条件 (距底部 30px 时触发加载)
  
          if (
            scrollTop + windowHeight >= scrollHeight - 30 &&
            !this.state.isBottom 
          ) {
                this.setState({
                    isBottom:true,
                    page: page+1
                })

                bookApi.getData(id,page).then(res=>{
                    // console.log('res',res);
                    if(res.data.data.list.length){
                        let arr = res.data.data.list.filter(item=>item.type!=3)
                        // console.log('arr',arr);
                        let list =[]
                        arr.forEach(item=>{
                            list.push(item)
                        })
                        this.setState({
                            articalList : [...this.state.articalList,...list],
                            isBottom:false
                        })
                    }else{
                        console.log('没数据了');
                    }
                    
                
                })
                // this.setState({
                //     isBottom:false,
                // })

            //   console.log('到底');
          }
        }
    }

    componentDidMount(){
        this.getList(0,1)
        this.checkScroll()
    }

    change(tab){
        console.log('a',tab);
        this.setState({
            id:tab.id
        })
        this.getList(tab.id,1);
        document.body.scrollTop = document.documentElement.scrollTop = 440
    }
    render(){
        // console.log('props',this.props);
        const {articalList} = this.state
        const {column} = this.props;
        const name = column.map(item=>{
            return {title : item.name,id:item.param}
        })
        return(
            <div className="acticals_container">
                <Tabs 
                    tabs={name} 
                    tabBarTextStyle={{fontSize:13}} 
                    tabBarActiveTextColor="#000" 
                    tabBarUnderlineStyle={{
                        width:20,
                        height:5,
                        backgroundColor:'#58bc58',
                        border:0,
                        borderRadius:2,
                        marginLeft:26
                    }} 
                    onChange={this.change} 
                    // renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
                    >
                    {/* {this.renderContent} */}
                    
                </Tabs>
                <div className="content">
                    {
                        
                        articalList.map((it,idx)=>{
                            return (
                                <div className="artical" key={it.data.id +''+ idx}>
                                    <div>
                                        <img src={it.data.cover.img_url}/>
                                        <div className="title">
                                            <h3>{it.data.title}</h3>
                                            <p>{it.data.describe}</p>
                                        </div>
                                    </div>
                                    <footer>
                                        <div className="user">
                                            <img src={it.data.user.avatar.img_url}/>
                                            <span>{it.data.user.username}</span>
                                        </div>
                                        <div className="favour">
                                            <span>
                                                <StarOutlined /> 
                                                <i>{it.data.favnums}</i>
                                            </span>
                                            <span>
                                                <EyeOutlined />
                                                <i>{it.data.viewnums}</i>
                                            </span>
                                        </div>
                                    </footer>
                                </div>
                            )
                        })
                        

                    }
                    </div>
                    
            </div>
       )
    }
}
export default Articals