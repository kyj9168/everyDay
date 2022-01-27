import { createSlice } from '@reduxjs/toolkit';

export const articleSlice = createSlice({
    name: 'article',
    initialState: {
        id: 0,
        title: 'loading...',
        content: 'loading...',
        userId: 'loading...',
        created: 'loading...',
        modified: 'loading...',
    },
    reducers: {
        registerArticle: (state, { payload: article }) => {
            console.log('게시글 등록 액션 호출 -- registerArticle'); // saga에서 감시용
        },
        getArticle: (state, { payload: id }) => {
            console.log('게시글 조회 액션 호출 -- getArticle'); // saga에서 감시용
        },
        getArticleAsync: (state, { payload: article }) => {
            console.log('saga에서 put 액션 호출 -- getArticleAsync');
            return {
                ...state,
                id: article.id,
                title: article.title,
                content: article.content,
                created: article.created,
                modified: article.modified,
            };
        },
        fetchArticle: (state, { payload: id }) => {
            console.log('게시글 조회 액션 호출 -- fetchArticle'); // saga에서 감시용
        },
        updateArticle: (state, { payload: article }) => {
            console.log('게시글 수정 액션 호출 -- updateArticle'); // saga에서 감시용
        },
        deleteArticle: (state, { payload: id }) => {
            console.log('게시글 삭제 액션 호출 -- deleteArticle'); // saga 에서 감시용
        },
        changeRegisterInput: (state, { payload }) => {
            switch (payload.name) {
                case 'title':
                    return {
                        ...state,
                        title: payload.value,
                    };

                case 'content':
                    return {
                        ...state,
                        content: payload.value,
                    };

                default:
                    break;
            }
        },
        initializationRegisterInput: (state, { payload }) => {
            return {
                ...state,
                id: 0,
                title: 'loading...',
                content: 'loading...',
                userId: 'loading...',
                created: 'loading...',
                modified: 'loading...',
            };
        },
    },
});

export const articleReducers = articleSlice.reducer;
export const articleActions = articleSlice.actions;
