import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class NotFound extends Component {
    render() {
        // window.console.log(this.props)
        return (
            
            <div className="notfound">
                <h1 style={{ textAlign: "center" }}>404 NotFound</h1>
                <Link to="/home">回到首页</Link>
            </div>
        )
    }
}
