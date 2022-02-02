import { takeEvery, takeLatest } from 'redux-saga/effects';
import { articleActions } from '../slice/articleSlice';
import { boardActions } from '../slice/boardSlice';
// import { commentActions } from "../slice/commentSlice";
import { userActions } from '../slice/userSlice';
import {
    //   registerArticleAsync,
    getArticleSaga,
    //   fetchArticleAsync,
    //   updateArticleAsync,
    deleteArticleAsync,
} from './articleSaga';
import { getBoardAsync, setBoardAsync, editBoardSaga } from './boardSaga';

import { loginUserAsync, loginUserCheckAsync, sendJoinUser, logoutUserSaga, leaveUserSaga,changePwdSaga } from './userSaga';

const {
    //   registerArticle,
    //   registerUser,
    getArticle,
    //   fetchArticle,
    //   updateArticle,
    deleteArticle,
} = articleActions;
const { getBoard, setBoard, editBoard } = boardActions;
const { loginUser, loginUserCheck, joinUser, logoutUser, leaveUser,changePwd } = userActions;

// const { registerComment, getComments, deleteComment } = commentActions;

export default function* rootWatcher() {
    // yield takeLatest(registerUser.type, registerUserAsync);
    // yield takeLatest(registerArticle.type, registerArticleAsync);
    yield takeLatest(changePwd.type, changePwdSaga);
    yield takeLatest(logoutUser.type, logoutUserSaga);
    yield takeLatest(leaveUser.type, leaveUserSaga);
    yield takeLatest(loginUser.type, loginUserAsync);
    yield takeLatest(joinUser.type, sendJoinUser);
    yield takeEvery(loginUserCheck.type, loginUserCheckAsync);
    yield takeLatest(getBoard.type, getBoardAsync);
    yield takeLatest(setBoard.type, setBoardAsync);
    yield takeLatest(editBoard.type, editBoardSaga);
    yield takeLatest(getArticle.type, getArticleSaga);
    // yield takeEvery(fetchArticle.type, fetchArticleAsync);
    // yield takeLatest(updateArticle.type, updateArticleAsync);
    yield takeLatest(deleteArticle.type, deleteArticleAsync);
    // yield takeLatest(registerComment.type, registerCommentAsync);
    // yield takeEvery(getComments.type, getCommentsAsync);
    // yield takeLatest(deleteComment.type, deleteCommentAsync);
}
