import { combineReducers } from 'redux';
import { articleReducers } from './articleSlice';
import { boardReducers } from './boardSlice';
import { commentReducers } from './commentSlice';
import { userReducers } from './userSlice';

const rootReducer = combineReducers({
    articleReducers,
    boardReducers,
    commentReducers,
    userReducers,
});

export default rootReducer;
