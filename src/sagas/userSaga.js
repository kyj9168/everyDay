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
    console.log('?????? ??????', setParam);
    const responseForLeave = yield axios.post('/leaveUser', setParam);
    if (responseForLeave.data.status === 'success') {
        window.sessionStorage.setItem('status', 'logout');
        yield put(
            userActions.loginUserState({
                id: '',
                status: 'logout',
            })
        );
        alert('?????? ????????? ?????????????????????.');
        history.push(`/`);
    } else {
        alert('??????????????? ?????? ?????? ????????? ???????????? ???????????????. ?????? ?????? ????????? ?????????.');
    }
}

export function* changePwdSaga(action) {
    const data = action.payload;
    const setParam = {
        userPwd: data.originalPwdInputValue,
        changePwd: data.pwdInputValue,
    };
    console.log(123123123, setParam);
    // console.log('?????? ??????', setParam);
    const responseForChangePwd = yield axios.post('/changePwd', setParam);
    if (responseForChangePwd.data.status === 'success') {
        alert('??????????????? ?????????????????????. ????????? ??????????????? ?????? ????????? ????????????.');
        window.sessionStorage.setItem('status', 'logout');
        yield put(
            userActions.loginUserState({
                id: '',
                status: 'logout',
            })
        );
        history.push(`/`);
    } else {
        alert('??????????????? ???????????????. ?????? ????????? ?????????.');
        history.push(`/`);
    }
    //     window.sessionStorage.setItem('status', 'logout');
    //     yield put(
    //         userActions.loginUserState({
    //             id: '',
    //             status: 'logout',
    //         })
    //     );
    //     alert('?????? ????????? ?????????????????????.');
    //     history.push(`/`);
    // } else {
    //     alert('??????????????? ?????? ?????? ????????? ???????????? ???????????????. ?????? ?????? ????????? ?????????.');
    // }
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
        alert('???????????? ??????');
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
