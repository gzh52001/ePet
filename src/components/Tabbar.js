import React from 'react';
import {RedditOutlined,FileSearchOutlined,UserOutlined,ShoppingCartOutlined,AppstoreOutlined} from '@ant-design/icons'
import { withRouter } from 'react-router-dom';
import '@/assets/tabbar.scss'

class Tabbar extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: true,
      tablist:[
        {
          title:'精选',
          name:'home',
          path:'/home',
          icon: <RedditOutlined style={{fontSize:22}}/>,
        },
        {
          title:'分类',
          name:'sort',
          path:'/sort',
          icon: <AppstoreOutlined  style={{fontSize:22}}/>,
        },
        {
          title:'小萌书',
          name:'book',
          path:'/book',
          icon: <FileSearchOutlined  style={{fontSize:22}}/>,
        },
        {
          title:'购物车',
          name:'cart',
          path:'/cart',
          icon: <ShoppingCartOutlined  style={{fontSize:22}}/>,
        },
        {
          title:'我的e宠',
          name:'mine',
          path:'/mine',
          icon: <UserOutlined  style={{fontSize:22}}/>,
        },

      ]
    };
    this.renderContent = this.renderContent.bind(this)
  }

  renderContent(page) {
    const {history} = this.props
    history.push(page)
  }

  render() {
    const {tablist} = this.state
    const {match} = this.props
    return (
      <div className="tabbar_container">
        <ul className="tabbar">
          {
            tablist.map(item=>{
              return <li key={item.name} onClick={this.renderContent.bind(null,item.path)} className={`tabs ${match.path == item.path ? 'active' : ''}`}>
                {item.icon}
                <span className="title">{item.title}</span>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

Tabbar = withRouter(Tabbar)
export default Tabbar