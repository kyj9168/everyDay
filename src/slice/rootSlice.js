import { combineReducers } from 'redux';
import { articleReducers } from './articleSlice';
import { boardReducers } from './boardSlice';
import { userReducers } from './userSlice';
import { modalReducers } from './modalSlice';

const rootReducer = combineReducers({
    articleReducers,
    boardReducers,
    userReducers,
    modalReducers,
});

export default rootReducer;
