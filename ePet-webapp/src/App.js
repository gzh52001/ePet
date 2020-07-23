import React, { lazy, Suspense } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import './assets/App.scss';

const Home = lazy(()=> import('@/pages/Home'))
const Mine = lazy(()=> import('@/pages/Mine'))
const Book = lazy(()=> import('@/pages/Book'))
const Sort = lazy(()=> import('@/pages/Sort'))
const Cart = lazy(()=> import('@/pages/Cart'))
const Login = lazy(()=> import('@/pages/Login'))
const Reg = lazy(()=> import('@/pages/Reg'))
const Setting = lazy(()=> import('@/pages/Mine/Setting'))
const Search = lazy(()=> import('@/pages/Search'))
// const GoodsList = lazy(()=> import('@/pages/GoodsList'))
// const Detail = lazy(()=> import('@/pages/Detail'))
import GoodsList from '@/pages/GoodsList'
import Detail from '@/pages/Detail'
import { connect } from "react-redux"
import "./assets/flexible"
import LoadingPage from '@/components/Loading'

function App() {
  return (
    <div className="App">
      <LoadingPage/>
      {/* <Tabbar/> */}
      <Suspense fallback={<div>loading...</div>}>
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
      </Suspense>
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
