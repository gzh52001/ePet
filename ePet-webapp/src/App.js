import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import './assets/App.scss';
import Home from '@/pages/Home';
import Mine from '@/pages/Mine';
import Book from '@/pages/Book';
import Sort from '@/pages/Sort';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import Reg from '@/pages/Reg';
import Setting from '@/pages/Mine/Setting'
import Search from '@/pages/Search';
import GoodsList from '@/pages/GoodsList';
import Detail from '@/pages/detail';
// import Good from "./pages/Good"
import { connect } from "react-redux"
import "./assets/flexible"

function App() {
  return (
    <div className="App">
      {/* <Tabbar/> */}
      <Switch>
        <Route path='/home' component={Home}></Route>
        <Route path='/mine' component={Mine}></Route>
        <Route path='/book' component={Book}></Route>
        <Route path='/sort' component={Sort}></Route>
        <Route path='/cart' component={Cart}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/reg' component={Reg}></Route>
        <Route path='/setting' component={Setting}/>
        <Route path='/search' component={Search}></Route>
        <Route path='/detail/:id' component={Detail}></Route>
        <Route path='/GoodsList/:id' component={GoodsList}></Route>
        <Redirect from='/' to='/home' exact></Redirect>
      </Switch>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    carlist:state.goodslist
  }
}

App = connect(mapStateToProps)(App)
App = withRouter(App)

export default App;