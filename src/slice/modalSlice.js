import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        joinModalState: false,
        changePwdState: false,
        leaveUserState: false,
    },
    reducers: {
        joinModalStateAsync: (state, { payload: data }) => {
            return {
                ...state,
                joinModalState: data || false,
            };
        },
        changePwdStateAsync: (state, { payload: data }) => {
            return {
                ...state,
                changePwdState: data || false,
            };
        },
        leaveUserStateAsync: (state, { payload: data }) => {
            return {
                ...state,
                leaveUserState: data || false,
            };
        },
    },
});

export const modalReducers = modalSlice.reducer;
export const modalActions = modalSlice.actions;
