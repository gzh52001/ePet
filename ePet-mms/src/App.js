import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Layoutbox from '@/components/Layoutbox/index';
import Login from '@/pages/Login'

function App() {
    return (
        <div className="app">
            <Switch>
                <Route path='/app' component={Layoutbox}></Route>
                <Route path='/login' component={Login}></Route>
                <Redirect from='/' to='/app' exact></Redirect>
            </Switch>
        </div>
    )
}

App = withRouter(App)
export default App