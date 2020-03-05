
import NotFound from '../components/NotFound/NotFound'
import Cart from '../components/Cart/Cart'
import Group from '../components/Group/Group'
import Home from '../components/Home/Home'
import Mine from '../components/Mine/Mine'

import Recommend from '../components/Group/Recommend'
import Beauty from  '../components/Group/Beauty'
import Baby from '../components/Group/Baby'
import Underwear from '../components/Group/Underwear'
import Ladies from '../components/Group/Ladies'
import Furniture from '../components/Group/Furniture'
import Foods from '../components/Group/Foods'
import Next from '../components/Group/Next'

const groupRouter = [
    {
        path: '/group/recommend',
        component: Recommend,
        title: '推荐'
    },
    {
        path: '/group/beauty',
        component: Beauty,
        title: '美妆'
    }
   
    ,{
        path: '/group/baby',
        component: Baby,
        title: '母婴健康'
    }
    ,{
        path: '/group/underwear',
        component: Underwear,
        title: '内衣'
    }
    ,{
        path: '/group/ladies',
        component: Ladies,
        title: '女装'
    }
    ,{
        path: '/group/furniture',
        component: Furniture,
        title: '家居'
    }
    ,{
        path: '/group/foods',
        component: Foods,
        title: '食品保健'
    }
    ,{
        path: '/group/next',
        component: Next,
        title: '下期预告'
    }
 ]
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
 
export { subRoutes, groupRouter}