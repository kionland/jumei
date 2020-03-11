import React, { Component } from 'react'
import CartTop from './CartTop'
import Warning from './Warning'
import axios from 'axios'
import actionCreator from '../Home/actionCreator';
import { connect } from 'react-redux'
class CartLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        let phone = localStorage.getItem("phone")
        window.console.log(phone);
        
        axios.get("http://localhost:9394/orders/cartlist", { params: { phone } }).then((res) => {
            this.props.setCartlist(res.data.datalist)
        }).then(() => {
            let all = this.props.CR.cartlist.every((item) => item.checked === 1)
            this.props.everyIsChecked(all)
        })
    }
    
    editBuyNum = (cart_id,editBuyNum) => {
        let phone = localStorage.getItem("phone")
        axios.patch('http://localhost:9394/orders/editBuyNum', { cart_id, phone, editBuyNum: editBuyNum === 0 ? 1 : 0 }).then(() => {
            setTimeout(() => {
                axios.get("http://localhost:9394/orders/cartlist", { params: { phone } }).then((res) => {
                    this.props.setCartlist(res.data.datalist)
                })
            }, 50);
        })
    }
    changeChecked = (cart_id,checked) => {
        let phone = localStorage.getItem("phone")
        axios.patch('http://localhost:9394/orders/changeChecked', { cart_id, phone, checked: checked === 0 ? 1 : 0 }).then(() => {
            setTimeout(() => {
                axios.get("http://localhost:9394/orders/cartlist", { params: { phone } }).then((res) => {
                    this.props.setCartlist(res.data.datalist)
                }).then(() => {
                    let all= this.props.CR.cartlist.every((item) =>  item.checked===1)
                    this.props.everyIsChecked(all)
                    
                }).then(() => {
                    let allPrice = 0;
                    let { cartlist } = this.props.CR
                    cartlist.forEach((item) => {
                        if(item.checked) (allPrice += item.buyNum * 1 * item.jumeiPrice)
                        this.props.allPrice(allPrice)
                    })
                })
            }, 50);
        })
    }
    decrease = (cart_id, buyNum) => {
        let phone = localStorage.getItem("phone")
        axios.patch('http://localhost:9394/orders/changeBuyNum', { cart_id, phone, buyNum: buyNum < 2 ? 1 :buyNum - 1 }).then(() => {
            setTimeout(() => {
                axios.get("http://localhost:9394/orders/cartlist", { params: { phone } }).then((res) => {
                    this.props.setCartlist(res.data.datalist)
                }).then(() => {
                    let allPrice = 0;
                    let { cartlist } = this.props.CR
                    cartlist.forEach((item) => {
                        if (item.checked) (allPrice += item.buyNum * 1 * item.jumeiPrice)
                        this.props.allPrice(allPrice)
                    })
                })
            }, 50);
        })
    }
    increase = (cart_id,buyNum) => {
        let phone = localStorage.getItem("phone")
        axios.patch('http://localhost:9394/orders/changeBuyNum', { cart_id, phone, buyNum: buyNum + 1 }).then(() => {
            setTimeout(() => {
                axios.get("http://localhost:9394/orders/cartlist", { params: { phone } }).then((res) => {
                    this.props.setCartlist(res.data.datalist)
                }).then(() => {
                    let allPrice = 0;
                    let { cartlist } = this.props.CR
                    cartlist.forEach((item) => {
                        if (item.checked) (allPrice += item.buyNum * 1 * item.jumeiPrice)
                        this.props.allPrice(allPrice)
                    })
                })
            }, 50);
        })
    }
    remove = (cart_id) => {
        let phone = localStorage.getItem("phone")
      
        axios.delete('http://localhost:9394/orders/del', { params: { cart_id }}).then(() => {
            setTimeout(() => {
                axios.get("http://localhost:9394/orders/cartlist", { params: { phone } }).then((res) => {
                    this.props.setCartlist(res.data.datalist)
                })
            }, 50);
        })
    }
    changeAll = () => {
            this.props.everyIsChecked(!this.props.CR.everyIsChecked)
        setTimeout(() => {
            // window.console.log(this.props.CR.everyIsChecked);
            let allPrice = 0;
            let { cartlist, everyIsChecked } = this.props.CR
            cartlist.forEach((item) => {
                this.changeChecked(item.cart_id, everyIsChecked ? 0 : 1)
                everyIsChecked ? (allPrice += item.buyNum * 1 * item.jumeiPrice) : (allPrice=0)
                // window.console.log(allPrice);
                this.props.allPrice(allPrice)
            })
        }, 50);
    }
    goTop = () => {
        // window.scrollTo(0, 0)
        let timer = setInterval(function () {
            //获取滚动条的滚动高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //用于设置速度差，产生缓动的效果
            var speed = Math.floor(-osTop / 4);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            // isTop = true;  //用于阻止滚动事件清除定时器
            if (osTop == 0) {
                clearInterval(timer);
            }
        }, 100);
    }
    toDetail = (table_list, list_id) => {
        this.props.history.push("/detail?table=" + table_list + "&list_id=" + list_id)
    }
    render() {
        let { tokenIsOk, cartlist, everyIsChecked, allPrice } = this.props.CR
        // window.console.log(this.props.CR.everyIsChecked);
        return (
            <div style={{ display: tokenIsOk&&cartlist.length ? "block" : "none" }}>
                <CartTop {...this.props}></CartTop>
                {/* 列表栏 */}
                <div className="groups">
                    {
                        cartlist.map((item) => {
                            return <div className="group" key={item.cart_id}>
                                <div className="group-header">
                                    <span className={item.checked ? "check-box-checked" : "check-box-un-checked"} onClick={this.changeChecked.bind(this, item.cart_id, item.checked)}></span>
                                    <div className="group-title"> 聚美优品 自营商品 </div>
                                    <span className="arrow-wrapper" onClick={this.toDetail.bind(this,item.table_list,item.list_id)}>
                                        <span>查看详情</span>
                                    </span>
                                </div>
                                <div className="group-content">
                                    <div className="item">
                                        <span className={item.checked ? "check-box-checked" : "check-box-un-checked"} onClick={this.changeChecked.bind(this, item.cart_id, item.checked)}></span>
                                        <div className="item-content">
                                            <div className="img-title">
                                                <div className="img-wrap">
                                                    <img src={item.imgSrc} alt="韩国人气ladykin小灯泡童颜精华液120片/盒【沈梦辰荐】" />
                                                </div>

                                            </div>
                                            <div className="text-wrap">
                                                <span className="title">{item.title}</span>
                                                <div className="sub-title-1">
                                                    <span>购买数量</span>
                                                    <span>×{item.buyNum}</span>
                                                </div>
                                                <div className="number-editor" style={{ display: item.editBuyNum ? "block" : "none" }}>
                                                    <span className="decrease" onClick={this.decrease.bind(this, item.cart_id, item.buyNum)}></span>
                                                    <span>{item.buyNum}</span>
                                                    <span className="increase" onClick={this.increase.bind(this, item.cart_id, item.buyNum)}></span>
                                                </div>
                                                <div className="price-edit">
                                                    <span className="price"> ¥{item.jumeiPrice} </span>
                                                    <span className="edit" onClick={this.editBuyNum.bind(this,item.cart_id,item.editBuyNum)} style={{ display: item.editBuyNum ? "none" : "block" }}>编辑</span>
                                                    <div className="actions" style={{ display: item.editBuyNum? "block" : "none" }}>
                                                        <span className="delete"  onClick={this.remove.bind(this, item.cart_id)}>删除</span>
                                                        <span className="gap-line"></span>
                                                        <span className="action-finish" onClick={this.editBuyNum.bind(this, item.cart_id, item.editBuyNum)}>完成</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="discount-detail">
                                                <div className="discount-item">
                                                    <span>满减</span>
                                                    <div className="promo-rule">
                                                        <span>满129元减10元</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="group-tail red">
                                    <div className="icon">免</div>
                                    <span>已享新用户满39元包邮</span>
                                </div>
                            </div>
                        })
                    }
                </div>
                {/* 结算栏 */}
                <div className="submit-bottom submit-bottom-padding">
                    <div className="sub-info">
                        <span className={everyIsChecked ? "check-box-checked" : "check-box-un-checked"} onClick={this.changeAll}></span>
                        <span className="all-check-text">全选</span>
                        <div className="summary">

                            <span>合计</span>
                            <span className="red">¥{allPrice}</span>

                        </div>
                    </div>
                    <div className="submit-btn go-to-submit"> 去结算<span>({allPrice})</span>
                    </div>
                </div>
                {/* 弹出框 */}
                <Warning></Warning>
                <a className="goto-top block" onClick={this.goTop}></a>
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(CartLogin);