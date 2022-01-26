import { put } from 'redux-saga/effects';
import axios from 'axios';
import { boardActions } from '../slice/boardSlice';
import { commentActions } from '../slice/commentSlice';

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
