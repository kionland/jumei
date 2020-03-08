import React, { Component } from 'react'
import actionCreator from '../actionCreator';
import { connect } from 'react-redux'

import TodayDealItem from './TodayDealItem'
import TodayJmstoreItem from './TodayJmstoreItem'
 class Today extends Component {
     render() {
        //  window.console.log( this.props);
        let { currentIndex } = this.props.MLR
        return (
            <div className="online-wrap" style={{ display: currentIndex === 0 ?'block':'none'}}>
                <TodayJmstoreItem />
                <TodayDealItem {...this.props}/>
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Today);