import React, { Component } from 'react'

export default class TodayDiscount extends Component {
    render() {
        return (
            <section className="list-items" >
                <h2 className="items-title">
                    <span className="head_bg">
                        <img src="//f0.jmstatic.com/btstatic/h5/common/icon_title.png" alt="" />
                    </span>
                    <span>今日特惠</span></h2>
                <div className="metra-lists" style={{ height: 375.5 }}>
                    <a className="metra-list change-schame" style={{
                        top: "0rem",
                        left: "0rem",
                        width: "20rem",
                        height: "10rem"}}>
                        <img src="http://mp5.jmstatic.com/mobile/card_material/item_7710_2048_1024-ipad2048_1578366538.jpeg?imageView2/2/w/640/q/90" alt="" />
                    </a>
                    <a className="metra-list change-schame" style={{
                        top: "10rem",
                        left: "0rem",
                        width: "20rem",
                        height: "10rem"
                    }}>
                        <img src="http://mp5.jmstatic.com/mobile/card_material/item_7710_2048_1024-ipad2048_1582869236.jpeg?imageView2/2/w/640/q/90" alt="" />
                    </a>
                </div>
            </section>
        )
    }
}
