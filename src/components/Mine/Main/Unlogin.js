import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import actionCreator from '../../Home/actionCreator';
import { connect } from 'react-redux'
 class Unlogin extends Component {
    render() {
        let { tokenIsOk } = this.props.CR
        return (
            <div className="user-unlogin" style={{ display: tokenIsOk?"none":"block"}}>
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
export default connect((state) => state, actionCreator)(Unlogin);