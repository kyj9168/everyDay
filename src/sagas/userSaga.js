import { put } from 'redux-saga/effects';
import axios from 'axios';
// import { boardActions } from '../slice/boardSlice';
import { userActions } from '../slice/userSlice';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import history from '../utils/history';

export function* loginUserAsync(action) {
    const data = action.payload;

    const setParam = {
        userId: data.id,
        userPwd: data.pwd,
    };
    const responseForUser = yield axios.post('/login', setParam);
    console.log(12312312, responseForUser);
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
        yield put(
            userActions.loginUserState({
                id: '',
                status: 'fail',
            })
        );
    }
}

export function* loginUserCheckAsync(action) {
    const data = action.payload;

    const responseForCheck = yield axios.post('/userCheck');
    if (responseForCheck.data.status === 'success') {
        console.log(111111111111, responseForCheck.data);
        window.sessionStorage.setItem('status', 'login');
        yield put(
            userActions.loginUserState({
                id: responseForCheck.data.data.id,
                status: 'login',
            })
        );
    } else {
        window.sessionStorage.setItem('status', 'logout');
        yield put(
            userActions.loginUserState({
                id: '',
                status: 'logout',
            })
        );
    }
}

export function* logoutUserSaga(action) {
    const data = action.payload;

    const responseForCheck = yield axios.post('/logout');
    if (responseForCheck.data.status === 'success') {
        window.sessionStorage.setItem('status', 'logout');
        yield put(
            userActions.loginUserState({
                id: '',
                status: 'logout',
            })
        );
    } else {
        window.sessionStorage.setItem('status', 'login');
        yield put(
            userActions.loginUserState({
                id: responseForCheck.data.data.id,
                status: 'login',
            })
        );
    }
}

export function* leaveUserSaga(action) {
    const data = action.payload;
    const setParam = {
        userPwd: data,
    };
    console.log('유저 탈퇴', setParam);
    const responseForLeave = yield axios.post('/leaveUser', setParam);
    if (responseForLeave.data.status === 'success') {
        window.sessionStorage.setItem('status', 'logout');
        yield put(
            userActions.loginUserState({
                id: '',
                status: 'logout',
            })
        );
        alert('회원 탈퇴가 완료되었습니다.');
        history.push(`/`);
    } else {
        alert('비밀번호가 달라 회원 탈퇴가 진행되지 않았습니다. 다시 한번 진행해 주세요.');
    }
}
export function* sendJoinUser(action) {
    const data = action.payload;
    const setParam = {
        userId: data.id,
        userPwd: data.pwd,
    };
    const responseForJoin = yield axios.post('/join', setParam);

    if (responseForJoin.data.status === 'fail') {
        alert(responseForJoin.data.message);
    } else if (responseForJoin.data.status === 'success') {
        alert('회원가입 완료');
        window.sessionStorage.setItem('status', 'login');
        console.log('responseForJoin.data', responseForJoin.data.data.id);
        yield put(
            userActions.loginUserState({
                id: responseForJoin.data.data.id,
                status: 'login',
            })
        );
    }
    // if (responseForUser.data.status === 'success') {
    //     window.sessionStorage.setItem('status', 'login');
    //     yield put(
    //         userActions.loginUserState({
    //             id: responseForUser.data.data.id,
    //             status: 'login',
    //         })
    //     );
    // } else {
    //     window.sessionStorage.setItem('status', 'logout');
    //     yield put(
    //         userActions.loginUserState({
    //             id: '',
    //             status: 'fail',
    //         })
    //     );
    // }
}
