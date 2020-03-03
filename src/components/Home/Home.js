import React, { Component } from 'react'
import './Home.css'
import Header from './Header'
import SearchWrap from './SearchWrap'

export default class Home extends Component {
    render() {
        return (

            <section className="search_defer">
                <Header />
                <SearchWrap />
            </section>
        )
    }
}
