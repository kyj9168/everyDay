import { put } from 'redux-saga/effects';
import axios from 'axios';
import { articleActions } from '../slice/articleSlice';
import history from '../utils/history';

export function* registerArticleAsync(action) {
    const data = action.payload;

    const response = yield axios.post(`http://localhost:4000/board/`, data);

    alert('저장되었습니다.');

    history.push(`/article/${response.data.id}`, response.data.id);
}

export function* getArticleSaga(action) {
    const boardId = action.payload;

    const responseForArticle = yield axios.post(`/board`, { boardId });

    const ArticleData = responseForArticle.data;

    if (ArticleData.status === 'success') {
        // yield put(boardActions.getBoardSuccessAsync(boardData.data));
        yield put(articleActions.getArticleAsync(ArticleData.data));

        // history.push(`/article/${boardId}`);
    }
    // yield put(articleActions.getArticleAsync(request.data));
}

export function* fetchArticleAsync(action) {
    const id = action.payload;

    const response = yield axios.get(`http://localhost:4000/board/${id}`);

    yield put(articleActions.getArticleAsync(response.data));
}

export function* updateArticleAsync(action) {
    const article = action.payload;

    const response = yield axios.put(`http://localhost:4000/board/${article.id}`, article);

    alert('수정되었습니다.');

    // history.push(`/article/${response.data.id}`);

    history.push(`/article/${response.data.id}`, response.data.id);
}

export function* deleteArticleAsync(action) {
    const boardId = action.payload;

    const responseForDelete = yield axios.post(`/deleteBoard`, { boardId });
    console.log('responseForDelete', responseForDelete);
    // const ArticleData = responseForArticle.data;
    alert('삭제되었습니다.');

    history.push(`/`);

    // history.go(0);
}
