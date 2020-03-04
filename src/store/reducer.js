import { combineReducers } from 'redux';
import SWR from '../components/Home/SearchWrapReducer'
import HNR from '../components/Home/HeaderNavReducer'
import MLR from '../components/Home/MixcardListReducer'
var reducer = combineReducers({
    SWR,
    HNR,
    MLR
})

export default reducer;
