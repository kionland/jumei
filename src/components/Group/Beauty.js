import React, { Component } from 'react'
import axios from 'axios'
export default class Beauty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            table: "group_list_beauty"
        }
    }
    componentDidMount() {
        let { table } = this.state
        axios.get("http://localhost:9394/goods/jumei_all", { params: { table } }).then((res) => {
            this.setState({
                list: res.data.data
            })
        })
    }
    setPath = (list_id) => {
        let { table } = this.state
        setTimeout(() => {
            this.props.history.push("/detail?table=" + table + "&list_id=" + list_id)
        }, 100)
    }
    render() {
        return (
            <div className="tab-con tabcon-ptop">
                <div className="module-container tab-on">
                    <section className="product-items">
                        <ul className="product-con" tab="coutuan_home">
                            {
                                this.state.list.map((item, index) => {
                                    return <li key={item.list_id} onClick={this.setPath.bind(this, item.list_id)}>
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
                                                    <span className="ct-price">¥{item.jumeiPrice}</span>
                                                    <span className="sc-price"></span>
                                                    <span
                                                        className="jm-price">单买价 ¥{item.delPrice}</span>
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
