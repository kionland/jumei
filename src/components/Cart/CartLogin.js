import React, { Component } from 'react'
import CartTop from './CartTop'
import Warning from './Warning'
export default class CartLogin extends Component {
    render() {
        return (
            <div style={{ display: this.props.tokenIsOk ? "block" : "none" }}>
                <CartTop {...this.props}></CartTop>
                CartLogin
                <button >show</button>
                <Warning></Warning>
            </div>
        )
    }
}
