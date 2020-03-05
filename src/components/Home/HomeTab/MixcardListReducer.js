const initialState = {
    currentIndex: 0
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case "CHANGEIDX":
            return { ...state, currentIndex:payload }

    default:
        return state
    }
}
