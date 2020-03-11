import React, { Component } from 'react'
import Header from './Main/Header'
import Main from './Main/Main'
import './Main/Mine.css'
import axios from 'axios'
import actionCreator from '../Home/actionCreator';
import { connect } from 'react-redux'
 class Mine extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.verify = this.verify.bind(this)
    }
    componentDidMount() {
        this.verify();
        // window.console.log(this.props.CR);
       
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
                localStorage.removeItem("phone")
                localStorage.removeItem("token")
            }
        } else {
            window.console.log("没有token");
            this.props.setToken(false)
            localStorage.removeItem("phone")
            localStorage.removeItem("token")
        }
    }
    render() {
        // window.console.log(this.props);
        return (
            <>
                <Header {...this.props}></Header>
                <Main {...this.props}></Main>
            </>
        )
    }
}
export default connect((state) => state, actionCreator)(Mine);