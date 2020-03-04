import React, { Component } from 'react'
import actionCreator from './actionCreator';
import { connect } from 'react-redux'
 class Entrylux extends Component {
     render() {
         let { firstIndex } = this.props.HNR
        return (
            <div style={{ display: firstIndex === 3 ? 'block' : 'none' }}>
                Entrylux
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Entrylux);