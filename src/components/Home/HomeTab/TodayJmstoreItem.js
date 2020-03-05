import React, { Component } from 'react'
import axios from 'axios'

export default class TodayJmstoreItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:9394/goods/jumei_all", { params: { table: "home_today_img" } }).then((res) => {
            // window.console.log(res.data.data);
            this.setState({
                list: res.data.data
            })
        })
    }
    render() {
        return (
            <>
                {
                    this.state.list.map((item) => {
                        return <a className="product-item" key={item.list_id}>
                            <div className="jmstore-item item-each">
                                <img src={item.imgSrc} alt=""/>
                            </div>
                        </a>
                    })
                }
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
