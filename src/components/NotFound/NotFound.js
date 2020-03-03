import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
export default class NotFound extends Component {
    render() {
        window.console.log(this.props)
        return (
            
            <div className="notfound">
                <h1 style={{ textAlign: "center" }}>404 NotFound</h1>
                <NavLink to="/home">回到首页</NavLink>
            </div>
        )
    }
}
