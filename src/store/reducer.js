import { combineReducers } from 'redux';
import SWR from '../components/Home/Other/SearchWrapReducer'
import HNR from '../components/Home/Other/HeaderNavReducer'
import MLR from '../components/Home/HomeTab/MixcardListReducer'
var reducer = combineReducers({
    SWR,
    HNR,
    MLR
})

export default reducer;
