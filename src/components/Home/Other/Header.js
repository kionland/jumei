import React, { Component } from 'react'
import actionCreator from '../actionCreator';
import { connect } from 'react-redux'
class Header extends Component {
    show = () => {
         this.props.Show(true)
     }
    render() {
        return (
            <div id="#search">
                <header>
                    <span id="page_top" className="index-search" onClick={this.show} >
                        <img
                            src="https://f0.jmstatic.com/btstatic/h5/common/search_btn.png" alt=""/>
                        <span>搜索商品 分类 功效</span>
                    </span>
                    <span onClick={this.show}
                        id="search_action">
                        <img src="https://f0.jmstatic.com/btstatic/h5/index/search_list2.png"
                            className="search" alt=""/>
                    </span>
                </header>

            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Header);