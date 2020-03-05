import React, { Component } from 'react'
import actionCreator from '../actionCreator';
import { connect } from 'react-redux'
class SearchWrap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex:-1
        }
     }
   
    toggle = (index) => {
        if (this.state.currentIndex === index) {
            this.setState({
                currentIndex: -1
                
            })
        } else {
            this.setState({
                currentIndex: index
            })
        }
    }
    goBack = () => {
        this.props.GoBack(false);
    }
    render() {
        let { currentIndex } = this.state;
        let { visible } = this.props.SWR
        return (
            <div className="searchWrap" style={{display:visible?'block':'none'}}>
                <div id="page_outer" ></div>
                <div id="search_page">
                    <div className="search_head">
                       
                        <div className="input_outer">
                            <img src="https://f0.jmstatic.com/btstatic/h5/common/search_btn.png" alt=""
                                className="search_icon" />
                            <input type="text" placeholder="搜索商品名称、品牌、功效" id="search_input"
                                className="search_input" />
                        </div>
                        <a id="search_back" className="search_btn" onClick={this.goBack}>返回</a>
                    </div>
                    <ul className="search_links search_ul">
                        {
                            this.props.SWR.searchList.map((item, index) => {
                                return <li className={currentIndex === index ? "select search_link" : 'search_link'} key={index} onClick={this.toggle.bind(this, index)}>
                                    {item.name}
                                    <span className="arrow"></span>

                                    <ul className="search_subs" style={{ display: currentIndex === index?'block':'none'}}>
                                        {
                                            item.sub_categories.map((ele, idx) => {
                                                return <li className="search_sub" key={idx}>
                                                    <a  >{ele.name}</a>
                                                </li>
                                            })
                                        }
                                        

                                    </ul>
                                </li>
                            })
                        }
                        

                    </ul>

                </div>
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(SearchWrap);