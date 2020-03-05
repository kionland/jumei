import React, { Component } from 'react'
import actionCreator from '../actionCreator';
import { connect } from 'react-redux'

import TodayDiscount from './TodayDiscount'
import GlobalBrand from './GlobalBrand'
import TwoPics from './TwoPics'
import TenList from './TenList'
 class Baby extends Component {
     render() {
         let { firstIndex } = this.props.HNR
        return (
            <div style={{ display: firstIndex === 2 ? 'block' : 'none' }}>
                <TodayDiscount />
                <GlobalBrand />
                <TwoPics />
                <TenList />
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Baby);