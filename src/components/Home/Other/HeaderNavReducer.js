const initialState = {
    headerNavList:['首页', '极速免税店', '母婴', '轻奢', '名品特卖'],
    firstIndex:0
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case "CHANGEINDEX":
        return { ...state, firstIndex:payload }

    default:
        return state
    }
}
