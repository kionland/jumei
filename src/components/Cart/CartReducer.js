const initialState = {
    table: "",
    list_id: 0,
    tokenIsOk: false,
    cartlist: [],
    visible: false,
    comfirmRemove: false,
    everyIsChecked:false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case 'SETLISTID':
            return { ...state, list_id: payload.list_id, table: payload.table }
        
        case 'SETTOKEN':
            return { ...state, tokenIsOk: payload }
        
        case 'SETCARTLIST':
            return { ...state, cartlist: payload }
        
        case 'CHANGEVISIBLE':
            return { ...state, visible: payload }
        
        case 'COMFIRMREMOVE':
            return { ...state, comfirmRemove: payload }
        
        case 'EVERYISCHECKED':
            return { ...state, everyIsChecked: payload }

        default:
            return state
    }
}
