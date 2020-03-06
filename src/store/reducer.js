import { combineReducers } from 'redux';
import SWR from '../components/Home/Other/SearchWrapReducer'
import HNR from '../components/Home/Other/HeaderNavReducer'
import MLR from '../components/Home/HomeTab/MixcardListReducer'
import MR from '../components/Mine/MineReducer'
var reducer = combineReducers({
    SWR,
    HNR,
    MLR,
    MR
})

export default reducer;
