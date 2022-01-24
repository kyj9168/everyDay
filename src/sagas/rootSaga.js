import { takeEvery, takeLatest } from "redux-saga/effects";
// import { articleActions } from "../slice/articleSlice";
// import { boardActions } from "../slice/boardSlice";
// import { commentActions } from "../slice/commentSlice";
import { userActions } from "../slice/userSlice";
// import {
//   registerArticleAsync,
//   getArticleAsync,
//   fetchArticleAsync,
//   updateArticleAsync,
//   deleteArticleAsync,
// } from "./articleSaga";
// import { getBoardAsync } from "./boardSaga";
// import {
//   registerCommentAsync,
//   getCommentsAsync,
//   deleteCommentAsync,
// } from "./commentSaga";
import { registerUserAsync } from "./userSaga";

// const {
//   registerArticle,
//   registerUser,
//   getArticle,
//   fetchArticle,
//   updateArticle,
//   deleteArticle,
// } = articleActions;
// const { getBoard } = boardActions;
const { registerUser } = userActions;


// const { registerComment, getComments, deleteComment } = commentActions;

export default function* rootWatcher() {
  yield takeLatest(registerUser.type, registerUserAsync);
  // yield takeLatest(registerArticle.type, registerArticleAsync);
  // yield takeEvery(getArticle.type, getArticleAsync);
  // yield takeEvery(getBoard.type, getBoardAsync);
  // yield takeEvery(fetchArticle.type, fetchArticleAsync);
  // yield takeLatest(updateArticle.type, updateArticleAsync);
  // yield takeLatest(deleteArticle.type, deleteArticleAsync);
  // yield takeLatest(registerComment.type, registerCommentAsync);
  // yield takeEvery(getComments.type, getCommentsAsync);
  // yield takeLatest(deleteComment.type, deleteCommentAsync);
}
