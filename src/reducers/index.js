import { combineReducers } from 'redux';
import userDtoReducer from './user';
import base64Reducer from './camera'

// tổng hợp các reducer ở đây
const rootReducer = combineReducers({
    user: userDtoReducer,
    camera: base64Reducer
})

export default rootReducer;