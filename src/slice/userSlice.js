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
            console.log('유저 로그인 버튼 호출 -- loginUser'); // saga 애서 감시용
        },

        loginUserState: (state, { payload: data }) => {
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
