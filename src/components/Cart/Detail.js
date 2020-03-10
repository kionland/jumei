import React, { Component } from 'react'
import qs from 'querystring'
import axios from 'axios'
import actionCreator from '../Home/actionCreator';
import { connect } from 'react-redux'
class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectBuyNumVisible: false,
            recommendList: [],
            imgSrc: '',
            title: '',
            delPrice: '',
            jumeiPrice: '',
            buyNum: 1,
            table: '',
            list_id: 0
        }
    }
    componentDidMount() {
        let phone = localStorage.getItem("phone")
        let { table, list_id } = qs.parse(this.props.location.search.slice(1))
        axios.get("http://localhost:9394/goods/product", { params: { table, list_id } }).then((res) => {
            // window.console.log(res.data.datalist[0]);
            this.setState({
                imgSrc: res.data.datalist[0].imgSrc,
                title: res.data.datalist[0].title,
                delPrice: res.data.datalist[0].delPrice,
                jumeiPrice: res.data.datalist[0].jumeiPrice,
                table,
                list_id,
                phone
            })
        })
        axios.get("http://localhost:9394/orders/detail", { params: { phone, table, list_id } }).then((res) => {
            window.console.log(res);
            this.setState({
                buyNum: res.data.buyNum,
                dataType: res.data.type
            })
        })
        axios.get("http://localhost:9394/goods/jumei_all", { params: { table } }).then((res) => {
            this.setState({
                recommendList: res.data.data.slice(0, 10)
            })
        })

        this.goTop();
    }
    goTop = () => {
        // window.scrollTo(0, 0)
       let timer = setInterval(function () {
            //获取滚动条的滚动高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //用于设置速度差，产生缓动的效果
            var speed = Math.floor(-osTop / 6);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            // isTop = true;  //用于阻止滚动事件清除定时器
            if (osTop == 0) {
                clearInterval(timer);
            }
        }, 30);
    }
    decrease = (event) => {
        event.cancelBubble = true;
        event.preventDefault();
        event.stopPropagation();
        let { table, list_id, phone } = this.state
        this.setState({
            buyNum: this.state.buyNum + 1
        }, () => {
            axios.put("http://localhost:9394/orders/edit", { phone, table, list_id: list_id * 1, buyNum: this.state.buyNum }).then((res) => {
                window.console.log(res);

            })
        })
        return false;
    }
    increase = (event) => {
        event.cancelBubble = true;
        event.preventDefault();
        event.stopPropagation();
        let { table, list_id, phone } = this.state
        this.setState({
            buyNum: this.state.buyNum < 2 ? 1 : this.state.buyNum - 1
        }, () => {
            axios.put("http://localhost:9394/orders/edit", { phone, table, list_id: list_id * 1, buyNum: this.state.buyNum }).then((res) => {
                window.console.log(res);

            })
        })
        return false;
    }
    changeVisible = (event) => {
        event.cancelBubble = true;

        event.preventDefault();

        event.stopPropagation();
        this.setState({
            selectBuyNumVisible: !this.state.selectBuyNumVisible
        })
        return false;
    }
    addCart = (event) => {
        event.cancelBubble = true;
        event.preventDefault();
        event.stopPropagation();

        let { imgSrc, title, jumeiPrice, buyNum, table, list_id, phone } = this.state

        axios.get("http://localhost:9394/orders/detail", { params: { phone, table, list_id } }).then((res) => {
            // window.console.log(res.data.type);

            if (res.data.type) {
                // window.console.log("已经有产品");
                this.setState({
                    buyNum: this.state.buyNum + 1
                }, () => {
                    axios.put("http://localhost:9394/orders/edit", { phone, table, list_id: list_id * 1, buyNum: this.state.buyNum }).then((res) => {
                        window.console.log(res);

                    })
                })

            } else {
                // window.console.log("还没有产品");
                axios.post("http://localhost:9394/orders/add", { phone, imgSrc, title, jumeiPrice, buyNum, table, list_id: list_id * 1 }).then((res) => {
                    window.console.log(res);

                })
            }
        })


    }
    buyNow = (event) => {
        this.addCart(event);
        setTimeout(() => {
            this.props.history.push("/cart")
        }, 100);
    }
    goback = () => {
        this.props.history.goBack();
    }
    gohome = () => {
        this.props.history.push("/home")
    }
    toCart = () => {
        this.props.history.push("/cart")
    }

    render() {
        let { selectBuyNumVisible,
            recommendList,
            imgSrc,
            title,
            delPrice,
            jumeiPrice,
            buyNum } = this.state;
        // window.console.log(this.props);
        return (
            <>
                <section className="detail_main">
                    {/* {标题栏} */}
                    <header className="headerBar">
                        <nav className="touch-header">
                            <a id="touch-header-back" className="touch-header-back" onClick={this.goback}></a>
                            <div className="touch-header-title">{title}</div>
                            <a className="touch-header-home" onClick={this.gohome}></a>
                        </nav>
                    </header>
                    {/* {大图} */}
                    <article className="slide_wrap bgc-f">
                        <img
                            src={imgSrc}
                            alt="" className="swiper-slide-img add_cart_img" />
                    </article>
                    {/* {标题和价格} */}
                    <article className="prod_detail bgc-f">
                        <div className="normalShow">
                            <div className="price_info">
                                <span className="cur_price">￥{jumeiPrice}</span>
                                <del className="cost_price">￥{delPrice}</del>

                                <strong>11人已购买</strong>
                            </div>
                            <div className="downWrap" >
                                <div className="count_down">
                                    <span>还剩2天</span>
                                </div>
                            </div>
                        </div>
                    </article>
                    <div className="desc_wrap bgc-f fs14 color3">
                        <div className="normal_desc">
                            <span className="desc_iconv2 fs14">聚美自营</span>
                            {title}
                        </div>
                    </div>
                    <div className="additional-info bgc-f">
                        <a className="postage-link additional-list">
                            <div className="postage-wrap">
                                <div className="postage-type">运费</div>
                                <div className="postage-content">
                                    <span className="tip-word">本商品满299元或2件包邮（新疆部分区域除外）</span>
                                    <span className="arrow-icon-right"></span>
                                </div>
                            </div>
                        </a>
                    </div>
                    <article className="page_sku_wrapper" onClick={this.changeVisible}>
                        <div className="page_sku_bar clear">
                            <span className="title_name">请选择</span>
                            <div className="selected_value">
                                <strong className="selected_val">型号</strong>
                                <strong className="selected_val">分类</strong>
                            </div>
                            <i className="open_sku_icon"></i>
                        </div>
                        <div className="select_sku_tier" style={{ display: selectBuyNumVisible ? "block" : "none" }}>
                            <div className="sku_wrapper">
                                <div className="title_content clear">
                                    <div className="product_images">
                                        <img src="http://mp6.jmstatic.com/product/003/458/3458832_std/3458832_1000_1000.jpg?v=1532319867&amp;imageView2/2/w/800/q/90" className="product_img" />
                                    </div>
                                    <div className="product_info">
                                        <div>
                                            <h2 className="product_name">￥{jumeiPrice}</h2>
                                        </div>
                                        <div className="selected_product">
                                            <strong className="selected_val">请选择</strong>
                                            <strong className="selected_val">购买数量</strong>
                                        </div>
                                    </div>
                                    <i className="sku_close" onClick={this.changeVisible}></i>
                                </div>
                                <div className="select_option_wrap">
                                    <div className="buy_num clear">
                                        <span className="title_name">购买数量</span>
                                        <div className="item_content clear">
                                            <button className="shoping shop_reduce reduceDis" onClick={this.increase}></button >
                                            <span className="inputs">{buyNum}</span>
                                            <button className="shoping shop_addition" onClick={this.decrease}></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="submit_confirm_box">
                                    <button type="0" className="confirm_btn multi_submit" onClick={this.addCart}>加入购物车</button>
                                    <button type="1" className="confirm_btn" onClick={this.buyNow}>立即购买</button>
                                </div>
                            </div>
                        </div>
                    </article>
                    <section id="wx-fuwu" >
                        <div className="jm-fuwu">
                            <div className="fwh-icon"></div>
                            <div>
                                <div className="fwh-title">聚美官方服务号</div>
                                <div className="fwh-words">更多靠谱优惠推荐，尽在聚美微信服务号</div>
                            </div>
                        </div>
                        <div className="jm-fllow">
                            <div className="fwh-btn">点击关注</div>
                            <div className="fwh-fllow">或 微信搜索“聚美优品jumei”关注</div>
                        </div>
                    </section>
                    <div className="detail_msg_img pr bgc-f">
                        <p title="跨境电商消费者告知书">
                            <img src="//f0.jmstatic.com/btstatic/h5/htbsqH5.jpg" />
                        </p>
                        <p title="关于划现价的说明">
                            <img src="//p0.jmstatic.com/mobile/other/other/marketprice_h5.png" />
                        </p>
                    </div>
                    <div className="recommend bgc-f5">
                        <div className="recommend-title color3 fs14">您也许还喜欢</div>
                        <ul className="recommend-list">
                            {
                                recommendList.map((item) => {
                                    return <li key={item.list_id}>
                                        <a>
                                            <img src={item.imgSrc} alt="" />
                                            <span className="fs14">{item.title.slice(11)}</span>
                                            <span className="color-jm fs18">¥{item.jumeiPrice}</span>&nbsp;
                                <del className="color9 fs13">¥{item.groupPrice}</del>
                                            <p className="fs11 color9 hide">10.2万已售丨剩15天</p>
                                        </a>
                                    </li>
                                })
                            }

                        </ul>
                    </div>
                    <div className="buy-box bgc-f tac fs10">
                        <div className="icon-block block-style fl">
                            <a className="shopping-cart fs10">
                                购物车
                            <span className="cart-num">0</span>
                            </a>
                        </div>
                        <div className="button-block block-style fl">
                            <a className="add-shopping-cart fs14 add-shopping-cart-direct fl add-shopping-cart-new" onClick={this.addCart}>加入购物车</a>
                            <a className="add-shopping-cart add-shopping-cart-direct fs14 fl" onClick={this.buyNow}>立即购买</a>
                        </div>
                    </div>
                </section>

                <a className="goto-top block" onClick={this.goTop}></a>

            </>
        )
    }
}
export default connect((state) => state, actionCreator)(Detail);