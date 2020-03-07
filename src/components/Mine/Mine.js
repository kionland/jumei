import React, { Component } from 'react'
import Header from './Main/Header'
import Main from './Main/Main'
import './Main/Mine.css'
export default class Mine extends Component {
    render() {
        // window.console.log(this.props);
        return (
            <>
                <Header {...this.props}></Header>
                <Main></Main>
            </>
        )
    }
}
