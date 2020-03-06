import React, { Component } from 'react'

export default class Header extends Component {
    goback = () => {
        this.props.history.goBack();
    }
    gohome = () => {
        this.props.history.push("/home")
    }
    render() {
        window.console.log(this.props);
        return (
            <header className="head-wrap" style={{ zoom: "1.17188", display: "block"}}>
                <div className="head-left" onClick={this.goback}>
                    <a >&nbsp;</a>
                </div>
                <div className="head-title">我的蝚美</div>
                <div className="head-right" onClick={this.gohome}>
                    <a >&nbsp;</a>
                </div>
            </header>
        )
    }
}
