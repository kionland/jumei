import React, { Component } from 'react'
import actionCreator from '../Home/actionCreator';
import { connect } from 'react-redux'
 class Warning extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
     close = () => {
         this.props.changeVisible(false)
}
     comfirm = () => {
         this.props.comfirmRemove(true)
         this.props.changeVisible(false)
         
}
     render() {
         let { visible } = this.props.CR;
        return (
            <div className="over-lay" style={{ visibility: visible ?'visible':'hidden'}}>
                <div className="dialog tax-dialog">
                    <div className="dialog-header">
                        <span>提示</span>
                        <span className="dialog-close" onClick={this.close}></span>
                    </div>
                    <div className="dialog-content">
                        <div className="text"></div>
                        <div className="info"> 您确定要删除吗 </div>
                    </div>
                    <div className="dialog-tail" >
                        <a onClick={this.comfirm}>确定</a>
                        <a onClick={this.close}>取消</a>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state) => state, actionCreator)(Warning);