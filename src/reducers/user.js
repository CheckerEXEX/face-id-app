// init state lần đầu tiên
const initialState = {
    userDto: [],
    activeId: null
}

const userDtoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER_DTO': {
            // giữ lại state cũ
            const newUserDto = [...state.userDto]
            // push state mới vào
            newUserDto.push(action.payload);
            // trả về state cũ và state mới
            return {
                ...state,
                userDto: newUserDto
            };
        }
        case 'REMOVE_USER_DTO': {
            return state;
        }
        default:
            break;
    }
    return state;
}

export default userDtoReducer;