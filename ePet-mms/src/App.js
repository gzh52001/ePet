import React, { lazy, Suspense } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

// const Layoutbox = lazy(()=> import('@/components/Layoutbox/index'))
// const Login = lazy(()=> import('@/pages/Login'))
import Layoutbox from '@/components/Layoutbox/index'
import Login from '@/pages/Login'

function App() {
    return (
        <div className="app" style={{height:"100%"}}>
            {/* <Suspense fallback={<div>loading...</div>}> */}
                <Switch>
                    <Route path='/app' component={Layoutbox}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Redirect from='/' to='/app' exact></Redirect>
                </Switch>
            {/* </Suspense> */}
        </div>
    )
}

App = withRouter(App)
export default App