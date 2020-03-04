import React, { Component } from 'react'
import actionCreator from './actionCreator';
import { connect } from 'react-redux'
 class Discount extends Component {
     render() {
         let { firstIndex } = this.props.HNR
        return (
            <div style={{ display: firstIndex === 4 ? 'block' : 'none' }}>
                Discount
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Discount);