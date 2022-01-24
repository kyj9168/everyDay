import { put } from 'redux-saga/effects';
import Axios from 'axios';
// import { boardActions } from '../slice/boardSlice';
import { userActions } from '../slice/userSlice';
import { v4 as uuidv4 } from 'uuid';

import moment from 'moment';
export function* registerUserAsync(action) {
    const data = action.payload;
    if (!window.sessionStorage.getItem('token')) {
        window.sessionStorage.setItem('token', uuidv4());
    }
    const setParam = {
        id: data.id,
        pwd: data.pwd,
        joinData: moment().format('YYYY-M-D HH:mm:ss'),
        token: window.sessionStorage.getItem('token'),
        check: false,
    };
    const responseForCheck = yield Axios.post('/userCheck', setParam);
    console.log(123123, responseForCheck.data);

    if (responseForCheck.data == true) {
        const responseForUser = yield Axios.post('/login', setParam);
        yield put(userActions.getUsersAsync(responseForUser.data));
    } else if (responseForCheck.data == 'join') {
        yield put(
            userActions.getUsersAsync({
                check: 'join',
            })
        );
    } else {
        yield put(
            userActions.getUsersAsync({
                check: false,
            })
        );
    }
}
