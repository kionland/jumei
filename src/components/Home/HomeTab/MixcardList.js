import React, { Component } from 'react'
import actionCreator from '../actionCreator';
import { connect } from 'react-redux'

import Today from './Today'
import Tomorrow from './Tomorrow'
 class MixcardList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleList: ['今日10点上新', '明日10点预告']
            
        }
    }
    toggle = (index) => {
        this.props.changeIdx(index)
    }
    
    render() {
        let { titleList } = this.state;
        let { currentIndex } = this.props.MLR
        let { firstIndex}=this.props.HNR
        return (
            <section className="mixcard-list" style={{ display: firstIndex === 0 ? 'block' : 'none' }}>
                <div className="tab-title">
                    {
                        titleList.map((item, index) => {
                            return <span className={currentIndex === index ? "title-item tab-click" : "title-item"} onClick={this.toggle.bind(this,index)} key={index}>
                                {item}
                            </span>
                        })
                    }
                   
                </div>
                <Today />
                <Tomorrow />
            </section>

        )
    }
}
export default connect((state) => state, actionCreator)(MixcardList);