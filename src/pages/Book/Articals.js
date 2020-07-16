import React,{Component} from 'react';
import { Tabs } from 'antd-mobile';
import bookApi from '@/api/book';
import {EyeOutlined,StarOutlined} from '@ant-design/icons'

class Articals extends Component{
    constructor(){
        super();
        this.state={
            articalList:[]
        }
        this.getList = this.getList.bind(this)
        this.change = this.change.bind(this)
    }

    async getList(id){
        
        try{
            let p = await bookApi.getData(id)
            console.log("getlist",p.data.data.list);
            this.setState({
                articalList : p.data.data.list.filter(item=>item.type!=3)
            })
        }catch(err){
            console.log(err);
        }
    }

    componentDidMount(){
        this.getList('0')
    }

    change(tab){
        console.log('a',tab);
        this.getList(tab.id)
    }
    render(){
        // console.log('props',this.props);
        const {articalList,flag} = this.state
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
                        articalList.length ?
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
                        : <div></div>

                    }
                    </div>
                    
            </div>
       )
    }
}
export default Articals