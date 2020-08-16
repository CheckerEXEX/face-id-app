const initalState = {
    base64: '',
    id: null
}

// save string base64
const base64Reducer = (state = initalState, action) => {
    switch (action.type) {
        case 'ADD_BASE_64':
            return {
                base64: action.payload
            };
        case 'REMOVE_BASE_64':
            return {
                base64: ''
            }
        default:
            break;
    }
    return state;
}

export default base64Reducer;