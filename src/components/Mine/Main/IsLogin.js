import React, { Component } from 'react'
import actionCreator from '../../Home/actionCreator';
import { connect } from 'react-redux'
 class IsLogin extends Component {
     render() {
         let { tokenIsOk } = this.props.CR
         let phone = localStorage.getItem("phone")
        return (
            <div className="user" style={{ display: tokenIsOk ? "block" : "none" }}>
                <img src="http://p0.jmstatic.com/jmstore/user/icon/green_200_200.png?1583885027" alt="" className="photo" />
                <div className="user_bg">
                    <div className="user_info">
                        <span className="name">{phone.replace(/^(\d{3})\d{6}(\d+)/, "$1******$2")}</span>
                        <span className="grade">普通会员</span>
                    </div>
                </div>
                <div className="icons">
                    <a className="wishlist" >
                        <div className="icon"></div>
                        <span>心愿单</span>
                    </a>
                    <a className="onsale" >
                        <div className="icon"></div>
                        <span>开售提醒</span>
                    </a>
                    <a className="fav" >
                        <div className="icon"></div>
                        <span>收藏</span>
                    </a>
                </div>
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(IsLogin);