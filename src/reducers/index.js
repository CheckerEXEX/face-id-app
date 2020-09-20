import { composeWithDevTools } from 'redux-devtools-extension';
import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import ReduxThunk from 'redux-thunk';
import AuthReducer from './auth';

const reducers = combineReducers({
    auth: AuthReducer
});

const middleware = [ReduxThunk];

const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
