import React, { Component } from 'react'

export default class TwoPics extends Component {
    render() {
        return (
            <section className="list-items">
                <div className="metra-lists" style={{ height: 94 }}>
                    <a className="metra-list change-schame" style={{
                        top: "0rem",
                        left: "0rem",
                        width: "10rem",
                        height: "5rem"
                    }}>
                        <img src="http://mp5.jmstatic.com/mobile/card_material/item_5518_1024_512-ipad2048_1579227136.jpeg?imageView2/2/w/320/q/90" alt="" />
                    </a>
                    <a className="metra-list change-schame" style={{
                        top: "0rem",
                        left: "10rem",
                        width: "10rem",
                        height: "5rem"
                    }}>
                        <img src="http://mp6.jmstatic.com/mobile/card_material/item_5518_1024_512-ipad2048_1578880810.jpeg?imageView2/2/w/320/q/90" alt="" />
                    </a>
                </div>
            </section>
        )
    }
}
