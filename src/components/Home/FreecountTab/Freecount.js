import React, { Component } from 'react'
import actionCreator from '../actionCreator';
import { connect } from 'react-redux'
import axios from 'axios'
class Freecount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    img: "https://mp5.jmstatic.com/mobile/other/detail_page_guarantee/interantion_shipping.png?imageView2/2/w/51/q/70"
                    , name: "海外直供"
                },
                {
                    img: "https://mp5.jmstatic.com/mobile/other/detail_page_guarantee/genuine_guarantee.png?imageView2/2/w/51/q/70"
                    , name: "原装正品"
                },
                {
                    img: "https://mp5.jmstatic.com/mobile/other/detail_page_guarantee/global_delivery.png?imageView2/2/w/51/q/70"
                    , name: "极速到货"
                },
                {
                    img: "https://mp5.jmstatic.com/mobile/other/detail_page_guarantee/return_guarantee_7.png?imageView2/2/w/51/q/70"
                    , name: "轻松退货"
                }
            ]
            ,resList:[]
        }
    }
    componentDidMount() {
        axios.get("http://localhost:9394/goods/jumei_all", { params: { table: "home_list_freecount" } }).then((res) => {
            // window.console.log(res.data.data.slice(0, 50));
            this.setState({
                resList: res.data.data
            })
        })
    }
    render() {
        let { firstIndex } = this.props.HNR
        return (
            <div style={{ display: firstIndex === 1 ? 'block' : 'none' }}>
                <section id="deals-icon" className="deals-icon" >
                    <ul className="clear">
                        {
                            this.state.list.map((item, index) => {
                                return <li key={index}>
                                    <a >
                                        <img
                                            src={item.img} />
                                        <div className="deals-text">{item.name}</div>
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                </section>
                <section id="deals-content" className="deals-content">
                    <div className="deals-content-header">
                        <span className="head_bg">
                            <img src="https://f0.jmstatic.com/btstatic/h5/common/icon_title.png" />
                        </span>
                        <span>今日团购，每天10点上新</span>
                    </div>
                    <ul className="touch-activity-detail clear">
                        {
                            this.state.resList.map((item, index) => {
                                return <li key={item.list_id}>
                                    <a >
                                        <div className="product-info clear">
                                            <div className="product-img fl">
                                                <img className="product-label haitaoy-label lazy-load"
                                                    src={item.smallImg}
                                                />
                                                <img className="lazy-load deal-img"
                                                    src={item.bigImg}
                                                />
                                            </div>
                                            <div className="fl product-desc">
                                                <div className="product-name">
                                                    {item.title}
                                            </div>
                                                <div className="price-info">
                                                    <span className="exceed-hidden activity-jumei-price">
                                                        <span className="price">￥<span>{item.jumeiPrice}</span></span>
                                                        <span className="old">￥{item.delPrice}</span>
                                                    </span>
                                                </div>
                                            </div>
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
export default connect((state) => state, actionCreator)(Freecount);