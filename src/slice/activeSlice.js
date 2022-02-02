import { createSlice } from '@reduxjs/toolkit';

export const activeSlice = createSlice({
    name: 'modal',
    initialState: {
        darkModeState: false,
    },
    reducers: {
        darkModeStateAsync: (state, { payload: data }) => {
            console.log(12312, state.darkModeState);
            return {
                ...state,
                darkModeState: !state.darkModeState,
            };
        },
    },
});

export const activeReducers = activeSlice.reducer;
export const activeActions = activeSlice.actions;
