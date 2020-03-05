import React, { Component } from 'react'
import './Home.css'

import Header from './Other/Header'
import SearchWrap from './Other/SearchWrap'
import HeaderNav from './Other/HeaderNav'
import MixcardList from './HomeTab/MixcardList'
import Footer from './Other/Footer'
import Freecount from './FreecountTab/Freecount'
import Baby from './BabyTab/Baby'
import Discount from './DiscountTab/Discount'
import Entrylux from './EntryluxTab/Entrylux'

export default class Home extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll=()=> {
        // console.log(window.scrollY)
    }
    goTop = () => {
        window.scrollTo(0,0)
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
                <a className="goto-top block" onClick={this.goTop}></a>
            </section>
        )
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
}
