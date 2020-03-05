import React, { Component } from 'react'
import actionCreator from '../actionCreator';
import { connect } from 'react-redux'

import TodayDealItem from './TodayDealItem'
import TodayJmstoreItem from './TodayJmstoreItem'
 class Today extends Component {
    render() {
        let { currentIndex } = this.props.MLR
        return (
            <div className="online-wrap" style={{ display: currentIndex === 0 ?'block':'none'}}>
                <TodayJmstoreItem />
                <TodayDealItem />
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Today);