import React, { Component } from 'react'
import CartTop from './CartTop'

export default class CartEmpty extends Component {
    gohome = () => {
        this.props.history.push("/home")
    }
    render() {
        // window.console.log(this.props);
        return (
            <div className="page bg-empty">
                <CartTop {...this.props}></CartTop>
                <div className="cart-no-goods">
                    <div className="oops"></div>
                    <div className="empty-cart">您的购物车中没有商品，请先去挑选心爱的商品吧！</div>
                    <div className="go-stroll" onClick={this.gohome}>去逛逛</div>
                </div>
            </div>
        )
    }
}
