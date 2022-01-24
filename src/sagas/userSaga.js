import { put } from 'redux-saga/effects';
import Axios from 'axios';
// import { boardActions } from '../slice/boardSlice';
import { userActions } from '../slice/userSlice';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export function* loginUserAsync(action) {
    const data = action.payload;

    const setParam = {
        userId: data.id,
        userPwd: data.pwd,
    };
    const responseForUser = yield Axios.post('/login', setParam);

    if (responseForUser.data.status === 'success') {
        window.sessionStorage.setItem('status', 'login');
        yield put(
            userActions.loginUserState({
                id: responseForUser.data.data.id,
                status: 'login',
            })
        );
    } else {
        window.sessionStorage.setItem('status', 'logout');
    }
}

export function* loginUserCheckAsync(action) {
    const data = action.payload;

    const responseForCheck = yield Axios.post('/userCheck');
    if (responseForCheck.data.status === 'success') {
        window.sessionStorage.setItem('status', 'login');
        yield put(
            userActions.loginUserState({
                id: responseForCheck.data.data.id,
                status: 'login',
            })
        );
    } else {
        window.sessionStorage.setItem('status', 'logout');
    }
}
