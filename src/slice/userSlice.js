import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: window.sessionStorage.getItem('status') || 'none',
        id: window.sessionStorage.getItem('id') || 'none',
        token: window.sessionStorage.getItem('token') || 'none',
        check: 'none',
    },
    reducers: {
        registerUser: (state, { payload: user }) => {
            console.log('유저 액션 호출 -- registerUser'); // saga 애서 감시용
        },

        getUsersAsync: (state, { payload: data }) => {
            window.sessionStorage.setItem('id', data.id || 'none');
            window.sessionStorage.setItem('status', data.status || 'none');

            return {
                ...state,
                id: data.id || 'none',
                status: data.status || 'none',
                token: data.token || 'none',
                check: data.check,
            };
        },
        // deleteuser: (state, { payload: id }) => {
        //   console.log("댓글 삭제 액션 호출 -- deleteusers"); // saga 에서 감시용
        // },
    },
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;
