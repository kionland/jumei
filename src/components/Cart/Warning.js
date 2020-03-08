import React, { Component } from 'react'

export default class Warning extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }
    close = () => {
        this.setState({
        visible:false
    })
}
    render() {
        return (
            <div className="over-lay" style={{ visibility: this.state.visible ?'visible':'hidden'}}>
                <div className="dialog tax-dialog">
                    <div className="dialog-header">
                        <span>A</span>
                        <span className="dialog-close" onClick={this.close}></span>
                    </div>
                    <div className="dialog-content">
                        <div className="text">B</div>
                        <div className="info"> C </div>
                    </div>
                    <div className="dialog-tail" >
                        <a onClick={this.close}>知靓了</a>
                    </div>
                </div>
            </div>
        )
    }
}
