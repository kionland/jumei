import React, { Component } from 'react'

export default class Fund extends Component {
    render() {
        return (
            <div className="fund block">
                <div className="block-title">
                    <span><i className="block-title-icon myfund"></i>我的资产</span> 
                    
        </div>
                <div className="block-content">
                    <a className="block-item" >
                        <div className="value"></div>
                        <span>现金券</span>
                    </a>
                    <a className="block-item" >
                        <div className="value"></div>
                        <span>红包</span>
                    </a>
                    <a className="block-item" >
                        <div className="value"></div>
                        <span>聚美余额</span>
                    </a>
                    <a className="block-item" >
                        <div className="value"></div>
                        <span>礼品卡</span>
                    </a>
                </div>
            </div>
        )
    }
}
