import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { groupRouter } from '../../router/index'
import './Group.css'

export default class Group extends Component {
    goTop = () => {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div>
                <div className="nav-con" style={{ position: "fixed", left: "0px",top: "0px"}}>
                    <div className="nav-outer" id="nav-outer" style={{ overflowX: "scroll"}}>
                        <div className="list-tab" id="nav-inner" style={{ width: "628px"}}>
                            {
                                groupRouter.map((item) => {
                                    return <NavLink key={item.path} to={item.path} activeClassName="active2" >
                                        {item.title}
                                    <span></span>
                                    </NavLink>
                                })
                            }
                        </div>
                    </div>
                </div>
                <Switch>
                    {
                        groupRouter.map((item) => {
                            return <Route key={item.path} path={item.path} component={item.component} />
                        })
                    }
                    <Redirect from="/group" to="/group/recommend" exact />
                    <Redirect to="/404" />
                </Switch>
                <a className="goto-top block" onClick={this.goTop}></a>
            </div>
        )
    }
}
