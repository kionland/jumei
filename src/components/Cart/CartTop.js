import React, { Component } from 'react'

export default class CartTop extends Component {
    goback = () => {
        this.props.history.goBack();
    }
    gohome = () => {
        this.props.history.push("/home")
    }
    render() {
        return (
            <div className="header1">
                <div className="head-back-box" onClick={this.goback}>
                    <div className="head-back"></div>
                </div>
                <div className="head-title" style={{ color: "#333", fontSize: 16}}>购物车</div>
                <div className="head-home" onClick={this.gohome}></div>
            </div>
        )
    }
}
