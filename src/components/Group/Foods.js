import React, { Component } from 'react'
import axios from 'axios'
export default class Foods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:9394/goods/jumei_all", { params: { table: "group_list_foods" } }).then((res) => {
            // window.console.log(res.data.data);
            this.setState({
                list: res.data.data
            })
        })
    }
    render() {
        return (
            <div className="tab-con tabcon-ptop">
                <div className="module-container tab-on">
                    <section className="product-items">
                        <ul className="product-con" tab="coutuan_home">
                            {
                                this.state.list.map((item, index) => {
                                    return <li key={item.list_id}>
                                        <a className="goods">
                                            <div className="people-number">{item.buyNum}</div>
                                            <div className="goods-topsmall">
                                                <img
                                                    src={item.imgSrc} />
                                            </div>
                                            <div className="goods-middle">
                                                <span className="goods-num">[2人团]</span>{item.title.slice(5)}
                                            </div>
                                            <div className="goods-foot">
                                                <div className="price-left">
                                                    <span className="ct-price">¥{item.groupPrice}</span>
                                                    <span className="sc-price"></span>
                                                    <span
                                                        className="jm-price">单买价 ¥{item.jumeiPrice}</span>
                                                </div>
                                                <div className="time-right timer">
                                                    <span className="goods-btn">去开团</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                })
                            }
                            <div className="tips">已到当前页面最底部，看看其他页面吧~</div>
                        </ul>
                    </section>
                </div>
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
