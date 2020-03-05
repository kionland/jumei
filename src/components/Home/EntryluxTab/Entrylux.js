import React, { Component } from 'react'
import actionCreator from '../actionCreator';
import { connect } from 'react-redux'
import axios from 'axios'
class Entrylux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:9394/goods/jumei_all", { params: { table: "home_list_entrylux" } }).then((res) => {
            // window.console.log(res.data.data);
            this.setState({
                list: res.data.data
            })
        })
    }
    render() {
        let { firstIndex } = this.props.HNR
        return (
            <div style={{ display: firstIndex === 3 ? 'block' : 'none' }}>
                <section className="list-items">
                    <h2 className="items-title">
                        <span className="head_bg">
                            <img src="//f0.jmstatic.com/btstatic/h5/common/icon_title.png" />
                        </span>
                        <span>今日特惠</span>
                    </h2>
                    <div className="metra-lists" style={{ height: 188 }}>
                        <a className="metra-list change-schame" style={{
                            top: "0rem",
                            left: "0rem",
                            width: "20rem",
                            height: "10rem"
                        }}>
                            <img src="http://mp5.jmstatic.com/mobile/card_material/item_1654_1500_750-ipad2048_1583379068.jpeg?imageView2/2/w/640/q/90" alt="" />
                        </a>
                    </div>
                </section>
                <section className="tuan-items">
                    <h2 className="items-title">
                        <span className="head_bg">
                            <img src="//f0.jmstatic.com/btstatic/h5/common/icon_title.png" />
                        </span>
                        <span>精选活动</span>
                    </h2>
                    <ul className="tuan-list">
                        {
                            this.state.list.map((item, index) => {
                                return <li key={item.list_id}>
                                    <a className="clear">
                                        <div className="list-img">
                                            <img src={item.bigImg} />
                                            <div className="list-flag list-flag-discount">
                                                {item.description}
                                            </div>
                                        </div>
                                        <div className="list-info fl">
                                            <h1 className="list-tit">
                                                {item.brand}
                                            </h1>
                                            <div className="list-countdown">
                                                <span>
                                                    {item.countdown}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="list-logo fr">
                                            <img src={item.smallImg} />

                                        </div>
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                </section>
            </div>
        )
    }
    componentWillUnmount() {  //解决异步数据回来时,组件却卸载了
        //重写组件的setState方法，直接返回空
        this.setState = (state, callback) => {
            return;
        };
    }
}
export default connect((state) => state, actionCreator)(Entrylux);