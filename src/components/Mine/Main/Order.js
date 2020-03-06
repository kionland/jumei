import React, { Component } from 'react'

export default class Order extends Component {
    render() {
        return (
            <div className="order block">
                <div className="block-title">
                    <span><i className="block-title-icon myorder"></i>我的订单</span>

                    <a className="block-title-nav">
                        <span>查看我的全部订单</span>
                        <i className="arrow-right"></i>
                    </a>
                </div>
                <div className="block-content">
                    <a className="block-item" >
                        <i className="unpaid"></i>
                        <span>待付款</span>
                    </a>
                    <a className="block-item" >
                        <i className="unconfirm"></i>
                        <span>待收货</span>
                    </a>
                    <a className="block-item" >
                        <i className="uncomment"></i>
                        <span>待评价</span>
                    </a>
                    <a className="block-item" >
                        <i className="refund"></i>
                        <span>退货/退款</span>
                    </a>
                </div>
            </div>
        )
    }
}
