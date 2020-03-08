import { combineReducers } from 'redux';
import SWR from '../components/Home/Other/SearchWrapReducer'
import HNR from '../components/Home/Other/HeaderNavReducer'
import MLR from '../components/Home/HomeTab/MixcardListReducer'
import MR from '../components/Mine/MineReducer'
import CR from '../components/Cart/CartReducer'
var reducer = combineReducers({
    SWR,
    HNR,
    MLR,
    MR,
    CR
})

export default reducer;
