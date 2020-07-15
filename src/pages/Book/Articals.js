import React,{Component} from 'react';
import { Tabs } from 'antd-mobile';
import bookApi from '@/api/book'

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
                articalList : p.data.data.list
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
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}>
                    {/* {this.renderContent} */}
                    <div>
                    {
                        // renderContent = tab =>
                        // (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        // <p>Content of {tab.title}</p>
                        // </div>)
                        articalList.map((item,idx)=>{
                            return (
                                <div key={item.data.id +''+ idx}>
                                    {item.data.title}
                                </div>
                            )
                        })
                    }
                    </div>
                    
                </Tabs>
            </div>
       )
    }
}
export default Articals