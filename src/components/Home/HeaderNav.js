import React, { Component } from 'react'
import actionCreator from './actionCreator';
import { connect } from 'react-redux'
class HeaderNav extends Component {
    toggle = (index) => {
        this.props.changeIndex(index)
    }
    render() {
        let { headerNavList, firstIndex } = this.props.HNR
        return (
            <div id="hearder_nav">
                <div id="nav-outer">
                    <div id="nav-inner" className="headerNav clearfix" >
                        {
                            headerNavList.map((item, index) => {
                                return <p  className={firstIndex === index ? "navTitle nt_deal nav_select" : "navTitle nt_deal"} key={index} onClick={this.toggle.bind(this,index)}>
                                            <a >
                                            <span>{item}</span>
                                                <span className="header-nav-line"></span>
                                            </a>
                                        </p>
                            })
                        }
                       
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(HeaderNav);
