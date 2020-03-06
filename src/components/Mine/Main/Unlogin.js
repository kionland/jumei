import React, { Component } from 'react'
import {  Link} from 'react-router-dom'
export default class Unlogin extends Component {
    render() {
        return (
            <div className="user-unlogin">
                <div className="noportrait"></div>
                <div className="operation">
                    <Link to="/reg">注册</Link>
                    <div style={{ marginTop: 4}} className="separator"></div>
                    <Link to="/login">登录</Link>
                </div>
              
    </div>
        )
    }
}
