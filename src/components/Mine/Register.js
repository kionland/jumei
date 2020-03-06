import React, { Component } from 'react'
import axios from 'axios'
import actionCreator from '../Home/actionCreator';
import { connect } from 'react-redux'
 class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            regColor: "#feb2c5",
            msg:"获取验证码",
            warnColor: "#fff",
            warnText: "",
            phoneIsOk:false,
            messageIsOk:false,
            passwordIsOk:false
        }
    }
   
    checkPhone=(event)=> {
        let reg = /^1[3-9]\d{9}$/; // 最新手机号正则

        if (!reg.test(event.target.value.trim())) {
            this.setState({
                phoneIsOk: false,
                warnText: "请填写正确格式的手机号码！",
                warnColor: "red"
            })
            this.props.changeWarn(true)
            setTimeout(() => {
                this.props.changeWarn(false)
            }, 2000)
        } else {
            axios.get(
                "http://localhost:9394/users/checkname",
                {
                    params: {
                        phone: event.target.value.trim()
                    }
                }
            ).then((res) => {
                if (res.data.type) {
                    this.setState({
                        phoneIsOk: true,
                        warnText: "该手机号码可以注册",
                        warnColor: "#58bc58"
                    })
                    this.props.changeWarn(true)
                    setTimeout(() => {
                        this.props.changeWarn(false)
                    },2000)
                } else {
                    this.setState({
                        phoneIsOk: false,
                        warnText: "该手机号码已经注册，请换手机号码重试",
                        warnColor: "red"
                    })
                    this.props.changeWarn(true)
                    setTimeout(() => {
                        this.props.changeWarn(false)
                    }, 2000)
                }
            })
        }
    }
  randomNum=()=>{
      
  }
    goback = () => {
        this.props.history.goBack();
    }
    gologin = () => {
        this.props.history.push("/login")
    }
    render() {
        let { regColor, warnColor, warnText, phoneIsOk,msg } = this.state
        let { warnVisible } = this.props.MR
        
        return (
            <div className="warper1">
                <section className="views1">
                    <a id="back" onClick={this.goback}>
                        <img src="https://f2.jmstatic.com/static_passport/dist/v1.0.137928/touch/login_series/images/NavButtonBack_new.png" className="return" /></a>
                    <h1 className="theme1">注册</h1>
                    <a className="top_right" onClick={this.gologin}>登录</a>
                </section>
                <form action="" autoComplete="off">
                    <div className="other-login-outer">
                        <div className="other-login">
                            <span className="other-title">使用手机注册</span>
                        </div>
                    </div>
                   
                    <div className="jm_row icon_phone">
                        <div className="jm_col">
                            <input type="text" className="register_input" name="mobile" placeholder="请输入11位手机号" alertname="请输入手机号码" maxLength="11" id="account"  onBlur={this.checkPhone}/>
                        </div>
                    </div>
                    <div className="jm_row">
                        <div className="jm_col">
                            <input type="tel" className="register_input" placeholder="请输入6位验证码" id="mobileVerify" alertname="请输入短信验证码" name="mobileVerify"  />
                        </div>
                        <div className="jm_col jm_col_90px">
                            <a className="register_yzm" style={{ color: phoneIsOk ? "#fe4070" : "#feb2c5", borderColor: phoneIsOk ? "#fe4070" : "#feb2c5" }} onClick={this.randomNum}>{msg}</a>
                        </div>
                    </div>
                    
                    <div className="jm_row">
                        <div className="jm_col">
                            <input type="password" className="register_input" name="password" placeholder="6-16位登录密码/字母 和 数字" alertname="请设置密码" maxLength="16" autoComplete="off" />
                        </div>
                    </div>
                    <input type="submit" value="注册" className="register_button" id="tele_register" style={{ background: regColor}}/>
                </form>
                <div className="register_agreement jm_center">点击注册，表示同意 <a >《聚美优品用户协议》</a>
                </div>
                <p className="warning1" style={{ color: warnColor, display: warnVisible?"block":"none" }}>{warnText}</p>
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Register);