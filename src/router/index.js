
import NotFound from '../components/NotFound/NotFound'
import Cart from '../components/Cart/Cart'
import Group from '../components/Group/Group'
import Home from '../components/Home/Home'
import Mine from '../components/Mine/Mine'

 
const subRoutes = [
    {
        path: '/home',
        component: Home,
        title: '首页'
        , className:'tabbar-index'
    },
    {
        path: '/group',
        component: Group,
        title: '团购'
        , className: 'tabbar-coutuan'
    }
    ,
    {
        path: '/cart',
        component: Cart,
        title: '购物车'
        , className: 'tabbar-cart'
    }
    ,
    {
        path: '/mine',
        component: Mine,
        title: '我的'
        , className: 'tabbar-member'
    }
    ,
    {
        path: '/404',
        component: NotFound
    }
]
 
export { subRoutes}