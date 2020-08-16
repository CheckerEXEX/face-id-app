
export const addBase64 = (base64) => {
    return {
        type: 'ADD_BASE_64',
        payload: base64
    }
}

export const removeBase64 = () => {
    return {
        type: 'REMOVE_BASE_64',
    }
}