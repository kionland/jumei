import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink, withRouter } from 'react-router-dom'
export default class Unlogin extends Component {
    render() {
        return (
            <div className="user-unlogin">
                <div className="noportrait"></div>
                <div className="operation">
                    <a className="signup" >注册</a>
                    <div style={{ marginTop: 4}} className="separator"></div>
                    <a className="login" >登录</a>
                </div>
              
    </div>
        )
    }
}
