import { combineReducers } from 'redux';
import userDtoReducer from './user';

// tổng hợp các reducer ở đây
const rootReducer = combineReducers({
    user: userDtoReducer
})

export default rootReducer;