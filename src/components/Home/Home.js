import React, { Component } from 'react'
import './Home.css'

import Header from './Header'
import SearchWrap from './SearchWrap'
import HeaderNav from './HeaderNav'
import MixcardList from './MixcardList'
import Footer from './Footer'
import Freecount from './Freecount'
import Baby from './Baby'
import Discount from './Discount'
import Entrylux from './Entrylux'

import axios from 'axios'
export default class Home extends Component {
    componentDidMount() {
        // axios.get("http://localhost:9394/goods/jumei_all", { params: { table: "home_list_today" } }).then((res) => {
        //     window.console.log(res);
            
        // })
    }
    render() {
        return (

            <section className="search_defer">
                <Header />
                <SearchWrap />
                <HeaderNav />
                <MixcardList />
                <Freecount />
                <Baby />
                <Entrylux />
                <Discount />

                <Footer />
                <a className="goto-top block"></a>
            </section>
        )
    }
}
