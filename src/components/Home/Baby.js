import React, { Component } from 'react'
import actionCreator from './actionCreator';
import { connect } from 'react-redux'
 class Baby extends Component {
     render() {
         let { firstIndex } = this.props.HNR
        return (
            <div style={{ display: firstIndex === 2 ? 'block' : 'none' }}>
                Baby
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Baby);