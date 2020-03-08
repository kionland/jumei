import React, { Component } from 'react'
import './Cart.css'
import CartEmpty from './CartEmpty'
import CartLogin from './CartLogin'
import axios from 'axios'
export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tokenIsOk:false
        }
        this.verify=this.verify.bind(this)
    }
    componentDidMount() {
        this.verify();
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
            //    window.console.log("ok");
                this.setState({
                    tokenIsOk: true
               })
            } else {
                //失败
                // window.console.log("fail");
                this.setState({
                    tokenIsOk: false
                })
            }
        } else {
        //    window.console.log("没有token");
            this.setState({
                tokenIsOk: false
            })

        }
    }
    render() {
        return (
            <>
                <CartEmpty {...this.state}></CartEmpty>
                <CartLogin {...this.state}></CartLogin>
        </>
           
        )
    }
}
