import React, { Component } from 'react'
import actionCreator from './actionCreator';
import { connect } from 'react-redux'
class Freecount extends Component {
     render() {
         let { firstIndex } = this.props.HNR
        return (
            <div style={{ display: firstIndex === 1 ? 'block' : 'none' }}>
                Discount
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Freecount);