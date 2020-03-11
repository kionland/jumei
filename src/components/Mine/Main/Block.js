import React, { Component } from 'react'

export default class Block extends Component {
    logout = () => {
        localStorage.removeItem("phone")
        localStorage.removeItem("token")
        localStorage.removeItem("prevPage")
        setTimeout(() => {
            this.props.history.push("/home")
        }, 50);
    }
    render() {
        return (
            <div className="block list">
                <a className="list-item" >
                    <i className="list-item-icon rmaservice"></i>
                    <span>售后服务</span>
                    <i className="arrow-right"></i>
                </a>
                <a className="list-item" >
                    <i className="list-item-icon feedback"></i>
                    <span>意见反馈</span>
                    <i className="arrow-right"></i>
                </a>
                <a className="list-item" >
                    <i className="list-item-icon address"></i>
                    <span>收货地址</span>
                    <i className="arrow-right"></i>
                </a>
                <a className="list-item logout" onClick={this.logout}>
                    <i className="list-item-icon logout"></i>
                    <span>退出登录</span>
                    <i className="arrow-right"></i>
                </a>
                <a className="list-item" >
                    <i className="list-item-icon tel"></i>
                    <span>400-123-8888</span>
                    <i className="arrow-right"></i>
                </a>
            </div>
        )
    }
}
