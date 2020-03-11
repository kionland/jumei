import React, { Component } from 'react'
import Unlogin from './Unlogin'
import Order from './Order'
import Fund from './Fund'
import Block from './Block'
import IsLogin from './IsLogin'
export default class Main extends Component {
    render() {
        return (
            <div id="wrapper" style={{ zoom: "1.17188", display: "block" }}>
                <Unlogin {...this.props}></Unlogin>
                <IsLogin {...this.props}></IsLogin>
                <Order></Order>
                <Fund></Fund>
                <Block {...this.props}></Block>
                <div className="hint" style={{ paddingBottom: "3.0625rem"}}>
                    客服热线400-123-8888 (9:00-18:00)<br/>拨打前请记录您的UID 0 </div>
            </div>
        )
    }
}
