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
        // window.scrollTo(0, 0)
        let timer = setInterval(function () {
            //获取滚动条的滚动高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //用于设置速度差，产生缓动的效果
            var speed = Math.floor(-osTop / 6);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            // isTop = true;  //用于阻止滚动事件清除定时器
            if (osTop == 0) {
                clearInterval(timer);
            }
        }, 100);
    }
    render() {
        
        return (

            <section className="search_defer">
                <Header />
                <SearchWrap />
                <HeaderNav />
                <MixcardList {...this.props}/>
                <Freecount {...this.props}/>
                <Baby {...this.props}/>
                <Entrylux {...this.props}/>
                <Discount {...this.props}/>

                <Footer />
                <a className="goto-top block" onClick={this.goTop}></a>
            </section>
        )
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
}
