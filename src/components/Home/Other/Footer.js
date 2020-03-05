import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className="touch-footer-container">
                <div className="footer-image">
                    <a >
                        <img src="https://s1.jmstatic.com/templates/touch/css/v3/image/footer_bg.jpg" />
                    </a>
                </div>
                <ul className="tab clear">
                    <li className="checked">
                        <a >触屏版</a>
                    </li>
                    <li>
                        <a >电脑版</a>
                    </li>
                </ul>
                <div className="bottom-rights">
                    <p>©2017 聚美优品 Jumei.com</p>
                </div>
            </footer>
                )
            }
        }
