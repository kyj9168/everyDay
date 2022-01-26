import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        joinModalState: false,
    },
    reducers: {
        joinModalStateAsync: (state, { payload: data }) => {
            console.log(1231231, data);
            return {
                ...state,
                joinModalState: data || false,
            };
        },
        // allModalDisable: (state, { payload: data }) => {
        //     return {
        //         ...state,
        //         joinModalStatus: false,
        //     };
        // },
    },
});

export const modalReducers = modalSlice.reducer;
export const modalActions = modalSlice.actions;
