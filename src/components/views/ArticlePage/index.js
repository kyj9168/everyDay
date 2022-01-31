import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { articleActions } from '../../../slice/articleSlice';

import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import './style.scss';

function ArticlePage({ match, location }) {
    // console.log(match.params.articleId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(articleActions.getArticle(match.params.articleId));
        // dispatch(commentActions.getComments(match.params.articleId));
    }, []);

    const { id, title, content, created, modified } = useSelector(
        (state) => ({
            id: state.articleReducers.id,
            title: state.articleReducers.title,
            content: state.articleReducers.content,
            created: state.articleReducers.created,
            modified: state.articleReducers.modified,
        }),
        shallowEqual
    );
    // const views = useSelector((state) => state.articleReducers.views);
    // const comments = useSelector((state) => state.commentReducers.comments);

    const onDeleteClick = () => {
        if (!window.confirm('삭제하시겠습니까?')) return false;
        dispatch(articleActions.deleteArticle(id));
    };

    return (
        <>
            {id == 'loading' ? (
                <div className="loading">
                    <img src="/images/loading.svg" alt="loading" />
                </div>
            ) : (
                <div className="articlePage">
                    <a href="/">
                        <button className="backBtn">←</button>
                    </a>

                    <div className="acticleDetail">
                        <div style={{ padding: '10px', textAlign: created == 'loading' ? 'center' : 'right' }}>
                            {created}
                        </div>
                        <div style={{ padding: '10px', textAlign: 'center' }}>{title}</div>

                        <div style={{ padding: '10px', textAlign: 'center' }}>{ReactHtmlParser(content)}</div>
                    </div>

                    <div className="btnDiv">
                        <a href={`/edit/${id}`}>
                            <button className="editBtn">수정</button>
                        </a>
                        <button className="deleteBtn" onClick={onDeleteClick}>
                            삭제
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ArticlePage;
