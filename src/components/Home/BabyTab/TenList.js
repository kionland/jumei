import React, { Component } from 'react'
import axios from 'axios'
export default class TenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:9394/goods/jumei_all", { params: { table: "home_list_baby" } }).then((res) => {
            // window.console.log(res.data.data);
            this.setState({
                list: res.data.data
            })
        })
    }
    render() {
        return (
            <section className="tuan-items">
                <h2 className="items-title">
                    <span className="head_bg">
                        <img src="//f0.jmstatic.com/btstatic/h5/common/icon_title.png" />
                    </span>
                    <span>疯抢专场 早10点上新</span>
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
        )
    }
    componentWillUnmount() {  //解决异步数据回来时,组件却卸载了
        //重写组件的setState方法，直接返回空
        this.setState = (state, callback) => {
            return;
        };
    }
}
