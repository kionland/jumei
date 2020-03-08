import React, { Component } from 'react'
import axios from 'axios'
import actionCreator from '../Home/actionCreator';
import { connect } from 'react-redux'
import md5 from 'js-md5';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            regColor: "#feb2c5",
            msg: "获取验证码",
            warnColor: "#fff",
            warnText: "",
            phoneIsOk: false,
            messageIsOk: false,
            password1IsOk: false,
            password2IsOk: false
        }
    }

    checkPhone = (event) => {
        let reg = /^1[3-9]\d{9}$/; // 最新手机号正则
        let value1 = event.target.value.trim()
        if (!reg.test(value1)) {
            this.setState({
                phoneIsOk: false,
                warnText: "请填写正确格式的手机号码！",
                warnColor: "red"
            })
            this.props.setPhone("");
            this.props.changeWarn(true)
            setTimeout(() => {
                this.props.changeWarn(false)
            }, 3000)
        } else {
            axios.get(
                "http://localhost:9394/users/checkname",
                {
                    params: {
                        phone: value1
                    }
                }
            ).then((res) => {
                if (res.data.type) {
                    this.setState({
                        phoneIsOk: true,
                        warnText: "该手机号码可以注册",
                        warnColor: "#58bc58"
                    })
                    this.props.setPhone(value1);
                    this.props.changeWarn(true)
                    setTimeout(() => {
                        this.props.changeWarn(false)
                    }, 3000)
                } else {
                    this.setState({
                        phoneIsOk: false,
                        warnText: "该手机号码已经注册，请换手机号码重试",
                        warnColor: "red"
                    })
                    this.props.setPhone("");
                    this.props.changeWarn(true)
                    setTimeout(() => {
                        this.props.changeWarn(false)
                    }, 3000)
                }
            })
        }
    }
    randomNum = () => {
        let { phoneIsOk } = this.state;
        if (phoneIsOk) {
            let randomNum = parseInt(Math.random() * (999999 - 100000 + 1)) + 100000
            this.setState({
                msg: randomNum
            })
        }
    }
    checkMsg = (event) => {
        if (event.target.value.trim() * 1 !== this.state.msg) {

            this.setState({
                messageIsOk: false,
                warnText: "验证码输入错误，请点击重新获取",
                warnColor: "red"
            })
            this.props.changeWarn(true)
            setTimeout(() => {
                this.props.changeWarn(false)
            }, 3000)
        } else {
            this.setState({
                messageIsOk: true,
                warnText: "验证码输入正确",
                warnColor: "#58bc58"
            })
            this.props.changeWarn(true)
            setTimeout(() => {
                if (this.state.messageIsOk && this.state.password2IsOk) {
                    this.setState({
                        regColor: "#fe4070"
                    })
                }
            }, 300)
            setTimeout(() => {
                this.props.changeWarn(false)
            }, 3000)
        }
    }
    checkPassword1 = (event) => {
        let reg = /^[a-zA-Z][0-9a-zA-Z]{5,15}$/;
        let value2 = event.target.value.trim()
        if (!reg.test(value2)) {
            this.setState({
                password1IsOk: false,
                warnText: "密码格式输入错误，请重新输入",
                warnColor: "red"
            })
            this.props.setPassword1("");
            this.props.changeWarn(true)
            setTimeout(() => {
                this.props.changeWarn(false)
            }, 3000)
        } else {
            this.setState({
                password1IsOk: true
            })
            this.props.setPassword1(value2);
        }
    }
    checkPassword2 = (event) => {
        let value3 = event.target.value.trim()
        if (value3 !== this.props.MR.password1) {
            this.setState({
                password2IsOk: false,
                warnText: "两次密码输入不一致，请重新输入",
                warnColor: "red"
            })
            this.props.changeWarn(true)
            setTimeout(() => {
                this.props.changeWarn(false)
            }, 3000)
        } else {
            this.setState({
                password2IsOk: true
            })
            this.props.setPassword2(value3);
            setTimeout(() => {
                if (this.state.messageIsOk && this.state.password2IsOk) {
                    this.setState({
                        regColor: "#fe4070"
                    })
                }
            }, 300)
        }
    }
    register = () => {
        let { messageIsOk, phoneIsOk, password1IsOk, password2IsOk } = this.state;
        let { password2, phone } = this.props.MR
        if (password2IsOk && password1IsOk && phoneIsOk && messageIsOk) {
            axios.post(
                "http://localhost:9394/users/reg",
                {
                    password: md5(password2),
                    phone
                }
            ).then((res) => {
                window.console.log(res);
                if (res.data.type) {
                    this.setState({
                        warnText: "注册成功，即将跳转......",
                        warnColor: "#58bc58"
                    })
                    this.props.changeWarn(true)
                    setTimeout(() => {
                        this.props.changeWarn(false)
                        this.props.history.push("/login")
                    }, 2000)
                } else {
                    this.setState({
                        warnText: "注册失败，请重新填写信息！",
                        warnColor: "red"
                    })
                    this.props.changeWarn(true)
                    setTimeout(() => {
                        this.props.changeWarn(false)
                    }, 3000)
                }
            })
        }
    }
    goback = () => {
        this.props.history.goBack();
    }
    gologin = () => {
        this.props.history.push("/login")
    }
    render() {
        let { regColor, warnColor, warnText, phoneIsOk, msg } = this.state
        let { warnVisible} = this.props.MR;

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
                            <input type="text" className="register_input" name="mobile" placeholder="请输入11位手机号" alertname="请输入手机号码" maxLength="11" id="account" onBlur={this.checkPhone} autoComplete="off"/>

                        </div>
                    </div>

                    <div className="jm_row">
                        <div className="jm_col">
                            <input type="tel" className="register_input" placeholder="请输入6位验证码" id="mobileVerify" alertname="请输入短信验证码" name="mobileVerify" onBlur={this.checkMsg} autoComplete="off"/>

                        </div>
                        <div className="jm_col jm_col_90px">
                            <a className="register_yzm" style={{ color: phoneIsOk ? "#fe4070" : "#feb2c5", borderColor: phoneIsOk ? "#fe4070" : "#feb2c5" }} onClick={this.randomNum}>{msg}</a>
                        </div>
                    </div>

                    <div className="jm_row">
                        <div className="jm_col">
                            <input type="password" className="register_input" name="password" placeholder="6-16位登录密码/字母和数字/必须字母开头" alertname="请设置密码" maxLength="16" autoComplete="off" onBlur={this.checkPassword1} />

                        </div>
                    </div>

                    <div className="jm_row">
                        <div className="jm_col">
                            <input type="password" className="register_input" name="password" placeholder="请再次确认您输入的密码" alertname="请设置密码" maxLength="16" autoComplete="off" onBlur={this.checkPassword2} />

                        </div>
                    </div>

                    <input type="button" value="注册" className="register_button" id="tele_register" style={{ background: regColor }} onClick={this.register} />

                </form>

                <div className="register_agreement jm_center">点击注册，表示同意 <a >《聚美优品用户协议》</a>
                </div>

                <p className="warning1" style={{ color: warnColor, display: warnVisible ? "block" : "none" }}>{warnText}</p>
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Register);