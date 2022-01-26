import { takeEvery, takeLatest } from 'redux-saga/effects';
import { articleActions } from '../slice/articleSlice';
import { boardActions } from '../slice/boardSlice';
// import { commentActions } from "../slice/commentSlice";
import { userActions } from '../slice/userSlice';
import {
    //   registerArticleAsync,
    getArticleAsync,
    //   fetchArticleAsync,
    //   updateArticleAsync,
    //   deleteArticleAsync,
} from './articleSaga';
import { getBoardAsync } from './boardSaga';
// import {
//   registerCommentAsync,
//   getCommentsAsync,
//   deleteCommentAsync,
// } from "./commentSaga";
import { loginUserAsync, loginUserCheckAsync, sendJoinUser } from './userSaga';

const {
    //   registerArticle,
    //   registerUser,
    getArticle,
    //   fetchArticle,
    //   updateArticle,
    //   deleteArticle,
} = articleActions;
const { getBoard } = boardActions;
const { loginUser, loginUserCheck, joinUser } = userActions;

// const { registerComment, getComments, deleteComment } = commentActions;

export default function* rootWatcher() {
    // yield takeLatest(registerUser.type, registerUserAsync);
    // yield takeLatest(registerArticle.type, registerArticleAsync);
    yield takeLatest(loginUser.type, loginUserAsync);
    yield takeLatest(joinUser.type, sendJoinUser);
    yield takeEvery(loginUserCheck.type, loginUserCheckAsync);
    yield takeLatest(getBoard.type, getBoardAsync);
    yield takeLatest(getArticle.type, getArticleAsync);
    // yield takeEvery(fetchArticle.type, fetchArticleAsync);
    // yield takeLatest(updateArticle.type, updateArticleAsync);
    // yield takeLatest(deleteArticle.type, deleteArticleAsync);
    // yield takeLatest(registerComment.type, registerCommentAsync);
    // yield takeEvery(getComments.type, getCommentsAsync);
    // yield takeLatest(deleteComment.type, deleteCommentAsync);
}
