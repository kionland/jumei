import React, { Component } from 'react'
import actionCreator from './actionCreator';
import { connect } from 'react-redux'
 class Tomorrow extends Component {
     render() {
         let { currentIndex } = this.props.MLR
        return (
            <div style={{ display: currentIndex === 1 ? 'block' : 'none' }}>
                Tomorrow
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Tomorrow);