import React, { Component } from 'react'
import axios from 'axios'
import qs from 'querystring'
import actionCreator from '../Home/actionCreator';
import { connect } from 'react-redux'
import md5 from 'js-md5';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            regColor: "#feb2c5",
            warnColor: "#fff",
            warnText: "",
            phoneIsOk: false,
            passwordIsOk: false
        }
    }
    checkPhone = (event) => {
        let reg = /^1[3-9]\d{9}$/; // 最新手机号正则
        let value1 = event.target.value.trim()
        if (value1.length >= 11) {
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
                this.setState({
                    phoneIsOk: true
                })
                this.props.setPhone(value1);
                setTimeout(() => {
                    if (this.state.phoneIsOk && this.state.passwordIsOk) {
                        this.setState({
                            regColor: "#fe4070"
                        })
                    }
                }, 300)
            }
        } else {
            this.setState({
                phoneIsOk: false,
                regColor: "#feb2c5"
            })
            this.props.setPhone("");
        }

    }
    checkPassword1 = (event) => {
        let reg = /^[a-zA-Z][0-9a-zA-Z]{5,15}$/;
        let value2 = event.target.value.trim()
        if (value2.length >= 6) {
            if (!reg.test(value2)) {
                this.setState({
                    passwordIsOk: false,
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
                    passwordIsOk: true
                })
                this.props.setPassword1(value2);
                setTimeout(() => {
                    if (this.state.phoneIsOk && this.state.passwordIsOk) {
                        this.setState({
                            regColor: "#fe4070"
                        })
                    }
                }, 300)
            }
        } else {
            this.setState({
                passwordIsOk: false,
                regColor: "#feb2c5"
            })
            this.props.setPassword1("");
            
        }
    }
    login = () => {
        let { phoneIsOk, passwordIsOk } = this.state;
        let { password1, phone } = this.props.MR
        let { table, list_id } = qs.parse(this.props.location.search.slice(1))
        if (phoneIsOk && passwordIsOk) {
            axios.get(
                "http://localhost:9394/users/login",
                {
                    params: {
                        phone,
                        password: md5(password1),
                        keep: true
                    }
                }
            ).then((res) => {
                // window.console.log(res);
                
                if (res.data.type) {
                    this.setState({
                        warnText: "登录成功，即将跳转......",
                        warnColor: "#58bc58"
                    })
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("phone", phone);
                    this.props.changeWarn(true)
                    setTimeout(() => {
                        let prevPage = localStorage.getItem("prevPage")
                        if (prevPage) {
                            this.props.changeWarn(false)
                            this.props.history.push(prevPage+"?table=" + table + "&list_id=" + list_id)
                        } else {
                            this.props.changeWarn(false)
                            this.props.history.push("/home")
                        }
                    }, 2000)
                } else {
                    this.setState({
                        warnText: "登录失败，请重新填写信息！",
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
    render() {
        let { regColor, warnColor, warnText, phoneIsOk, passwordIsOk } = this.state
        let { warnVisible, phone, password1 } = this.props.MR;
        // window.console.log("phone:" + phone);
        // window.console.log("phoneIsOk:" + phoneIsOk);
        // window.console.log("passwordIsOk:" + passwordIsOk);
        // window.console.log("password1:" + md5(password1));

        return (
            <div className="warper1">
                <section className="views1">
                    <a id="back" >
                        <img src="https://f1.jmstatic.com/static_passport/dist/v1.0.137928/touch/login_series/images/NavButtonBack_new.png"
                            className="return" /></a>
                    <h1 className="theme1">登录</h1>
                    <a className="top_right" >注册</a>
                </section>
                <form acceptCharset="utf-8" method="post" id="login" autoComplete="off">
                    <div className="other-login-outer">
                        <div className="other-login">
                            <span className="other-title">使用聚美帐号登录</span>
                        </div>
                    </div>
                    <div className="jm_row icon_phone">
                        <div className="jm_col">
                            <input type="text" className="register_input" name="email" id="account" placeholder="已注册的手机号" alertname="用户名" onChange={this.checkPhone} autoComplete="off" />
                        </div>
                    </div>
                    <input type="password" className="register_input" name="password" placeholder="6-16位登陆密码" alertname="6-16位登陆密码" autoComplete="off" onChange={this.checkPassword1} />

                    <div className="jm_row register_jumei_account">
                        <a className="jm_col jm_right" >忘记密码？</a>
                    </div>
                    <input type="button" value="登录" className="register_button" id="ga_login" style={{ background: regColor }} onClick={this.login} />
                </form>
                <p className="warning1" style={{ color: warnColor, display: warnVisible ? "block" : "none" }}>{warnText}</p>
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Login);