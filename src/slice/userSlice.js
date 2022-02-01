import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        status: window.sessionStorage.getItem('status') || 'logout',
    },
    reducers: {
        loginUserCheck: (state, { payload }) => {
            console.log('메인 화면 유저 check -- loginUserCheck');
            // console.log('토근 체크 추가할 부분');
        },

        loginUser: (state, { payload: user }) => {
            console.log('유저 로그인 버튼 호출 -- loginUser'); 
        },
        joinUser: (state, { payload: user }) => {
            console.log('유저 회원가입 버튼 호출 -- joinUser');
        },
        logoutUser: (state, { payload: user }) => {
            console.log('유저 로그아웃 버튼 호출 -- logoutUser');
        },
        leaveUser: (state, { payload: user }) => {
            console.log('유저 탈퇴 버튼 호출 -- leaveUser');
        },
        
        loginUserState: (state, { payload: data }) => {
            console.log('유저 정보 state -- loginUserState');
            return {
                ...state,
                id: data.id || '',
                status: data.status || 'logout',
            };
        },
    },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
