import React, { Component } from 'react'
import axios from 'axios'
export default class TodayDealItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:9394/goods/jumei_all", { params: { table: "home_list_today" } }).then((res) => {
            // window.console.log(res.data.data.slice(0, 50));
            this.setState({
                list: res.data.data
            })
        })
    }
    render() {
        return (
            <>
                {this.state.list.map((item, index) => {
                    return <a className="product-item" key={item.list_id}>
                        <div className="deal-item item-each">
                            <div className="product-img"><img src={item.imgSrc} alt=""/>
                            </div>
                            <div className="product-detail">
                                <div className="product-title">
                                    {item.title}
                                </div>

                                <div className="price-wrap">
                                    <div className="price-list">
                                        <span className="jumei-price">¥<span>{item.jumeiPrice}</span></span>
                                        <span className="del-price">¥{item.delPrice}</span>
                                    </div>
                                    <div className="buy-num">{item.buyNum}</div>
                                </div>
                            </div>
                        </div>
                    </a>
                })}
            </>
        )
    }
    componentWillUnmount() {  //解决异步数据回来时,组件却卸载了
        //重写组件的setState方法，直接返回空
        this.setState = (state, callback) => {
            return;
        };
    }
}
