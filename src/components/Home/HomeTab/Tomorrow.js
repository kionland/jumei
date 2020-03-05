import React, { Component } from 'react'
import actionCreator from '../actionCreator';
import { connect } from 'react-redux'
import axios from 'axios'

class Tomorrow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:9394/goods/jumei_all", { params: { table: "home_list_tomorrow" } }).then((res) => {
            // window.console.log(res.data.data);
            this.setState({
                list: res.data.data
            })
        })
    }
     render() {
         let { currentIndex } = this.props.MLR
        return (
            <div className="pre-wrap" style={{ display: currentIndex === 1 ? 'block' : 'none' }}>
                {this.state.list.map((item, index) => {
                    return <a className="product-item" key={item.list_id} >
                        <div className="deal-item item-each">
                            <div className="product-img">
                                <img src={item.imgSrc} alt="" />
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
            </div>
        )
    }
    componentWillUnmount() {  //?????????,??????
        //?????setState????????
        this.setState = (state, callback) => {
            return;
        };
    }
}
export default connect((state) => state, actionCreator)(Tomorrow);