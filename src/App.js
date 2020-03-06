import React from 'react';
import './App.css';
import { subRoutes } from './router/index'
import { Route, Switch, Redirect, NavLink, withRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
       {
        subRoutes.map((item) => {
          return <Route key={item.path} path={item.path} component={item.component} />
        })
        }
        <Redirect from="/" to="/home" exact />
        <Redirect  to="/404"  />
      </Switch>

      <div className="bottom-nav" >
      {
        subRoutes.map((item) => {
          return <NavLink key={item.path} to={item.path} activeClassName="active1" className={item.className}>{item.title}</NavLink>
        })
        }
      </div>
    </div>
  );
}

export default withRouter(App);
