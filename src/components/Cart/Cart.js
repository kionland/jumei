import React, { Component } from 'react'
import './Cart.css'
import CartEmpty from './CartEmpty'
import CartLogin from './CartLogin'
import { Route, Switch, Redirect} from 'react-router-dom'
export default class Cart extends Component {
   
    render() {
        return (
            <>
                <Switch>
                    <Route path="/cart/mepty" component={CartEmpty} exact/>
                    <Route path="/cart/cartlist" component={CartLogin} exact/>
                   
                    <Redirect from="/cart" to="/cart/mepty" exact />
                </Switch>
               
        </>
           
        )
    }
}
