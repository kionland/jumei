const initialState = {

    warnVisible: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case 'CHANGEWARN':
            return { ...state, warnVisible:  payload }

    default:
        return state
    }
}
