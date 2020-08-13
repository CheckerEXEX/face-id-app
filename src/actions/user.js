
// thêm mới dto user
export const addUserDto = (user) => {
    return {
        type: 'ADD_USER_DTO',
        payload: user
    }
}

// xoá user dto
export const removeUserDto = (user) => {
    return {
        type: 'REMOVE_USER_DTO',
        payload: user
    }
}