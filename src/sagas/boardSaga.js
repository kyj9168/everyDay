import { put } from 'redux-saga/effects';
import axios from 'axios';
import { boardActions } from '../slice/boardSlice';

import history from '../utils/history';
export function* getBoardAsync() {
    try {
        const responseForBoard = yield axios.post(`/boardList`);

        const boardData = responseForBoard.data;
        if (boardData.status === 'success') {
            yield put(boardActions.getBoardSuccessAsync(boardData.data));
        }
        console.log('boardData:::', boardData);
    } catch (e) {
        yield put(boardActions.getBoardFailedAsync(e.message));
    }
}

export function* setBoardAsync(action) {
    try {
        const data = action.payload;
        console.log('data:::::::;', data);
        const setParam = {
            title: data.title,
            content: data.content,
            created: data.created,
        };
        const responseForBoard = yield axios.post(`/setBoard`, setParam);

        const boardData = responseForBoard.data;
        console.log('등록 성공::::::::::::', boardData);
        if (boardData.status === 'success') {
            alert('일상이 등록되었습니다.');

            history.push(`/`);
        }
        //     yield put(boardActions.getBoardSuccessAsync(boardData.data));
        // }
        // console.log('boardData:::', boardData);
    } catch (e) {
        yield put(boardActions.getBoardFailedAsync(e.message));
    }
}

export function* editBoardSaga(action) {
    try {
        const data = action.payload;
        console.log('data:::::::;', data);
        const setParam = {
            id: data.id,
            title: data.title,
            content: data.content,
            created: data.created,
        };
        const responseForBoard = yield axios.post(`/editBoard`, setParam);

        const boardData = responseForBoard.data;
        console.log('수정 성공::::::::::::', boardData);
        if (boardData.status === 'success') {
            alert('수정 되었습니다.');

            history.push(`/article/${data.id}`);
        }
        //     yield put(boardActions.getBoardSuccessAsync(boardData.data));
        // }
        // console.log('boardData:::', boardData);
    } catch (e) {
        yield put(boardActions.getBoardFailedAsync(e.message));
    }
}
