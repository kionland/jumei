const initialState = {
    table: "",
    list_id: 0
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case 'SETLISTID':
        return { ...state, list_id:payload.list_id,table:payload.table }

    default:
        return state
    }
}
