import React, { Component } from 'react'
import './Cart.css'
import CartEmpty from './CartEmpty'
import CartLogin from './CartLogin'
import axios from 'axios'
import actionCreator from '../Home/actionCreator';
import { connect } from 'react-redux'
 class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.verify=this.verify.bind(this)
    }
    componentDidMount() {
        this.verify();
        // window.console.log(this.props.CR);
        setTimeout(() => {
            let { tokenIsOk } = this.props.CR
            if (tokenIsOk) {
                // window.console.log("this.props.tokenIsOk");
                let phone = localStorage.getItem("phone")
                axios.get("http://localhost:9394/orders/cartlist", { params: { phone } }).then((res) => {
                    // window.console.log(res.data.datalist);
                    this.props.setCartlist(res.data.datalist)
                })
            }
        }, 50);
    }
    async verify() {//contex就是store   == this.$store.commit
        let token = localStorage.getItem("token");
        if (token) {
            //有token：登陆了，验证token
            let { data } = await axios.get("http://localhost:9394/users/verify", {
                params: {
                    token
                }
            });
            if (data.type) {
                //成功
                window.console.log("tokenIsOk");
                this.props.setToken(true)
            } else {
                //失败
                window.console.log("tokenIsOk---fail");
                this.props.setToken(false)
            }
        } else {
           window.console.log("没有token");
            this.props.setToken(false)
        }
    }
    render() {
        return (
            <>
                <CartEmpty {...this.props}></CartEmpty>
                <CartLogin {...this.props}></CartLogin>
        </>
           
        )
    }
}
export default connect((state) => state, actionCreator)(Cart);