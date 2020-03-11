const initialState = {
    password1: '',
    password2: '',
    phone: "",
    warnVisible: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case 'CHANGEWARN':
            return { ...state, warnVisible: payload }

        case 'SETPHONE':
            return { ...state, phone: payload }
        
        case 'SETPASSWORD1':
            return { ...state, password1: payload }
        
        case 'SETPASSWORD2':
            return { ...state, password2: payload }
        
        default:
            return state
    }
}
