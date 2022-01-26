import { combineReducers } from 'redux';
import { articleReducers } from './articleSlice';
import { boardReducers } from './boardSlice';
import { commentReducers } from './commentSlice';
import { userReducers } from './userSlice';
import { modalReducers } from './modalSlice';

const rootReducer = combineReducers({
    articleReducers,
    boardReducers,
    commentReducers,
    userReducers,
    modalReducers,
});

export default rootReducer;
