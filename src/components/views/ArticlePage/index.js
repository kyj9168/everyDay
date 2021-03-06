import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { articleActions } from '../../../slice/articleSlice';
import { Link, useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import './style.scss';

function ArticlePage({ match, location }) {
    // console.log(match.params.articleId);

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(articleActions.getArticle(match.params.articleId));
        // dispatch(commentActions.getComments(match.params.articleId));
    }, []);

    const { id, title, content, created, modified, loading } = useSelector((state) => ({
        id: state.articleReducers.id,
        title: state.articleReducers.title,
        content: state.articleReducers.content,
        created: state.articleReducers.created,
        modified: state.articleReducers.modified,
        loading: state.articleReducers.loading,
    }));
    // const views = useSelector((state) => state.articleReducers.views);
    // const comments = useSelector((state) => state.commentReducers.comments);

    const onDeleteClick = () => {
        if (!window.confirm('삭제하시겠습니까?')) return false;
        dispatch(articleActions.deleteArticle(id));
    };
    const onEditClick = () => {
        if (!window.confirm('수정하시겠습니까?')) return false;
        dispatch(articleActions.initializationRegisterInput());
        const path = `/edit/${id}`;
        history.push(path);
    };
    const { darkModeState } = useSelector((state) => ({
        darkModeState: state.activeReducers.darkModeState,
    }));
    return (
        <>
            {loading ? (
                <div
                    className="loading"
                    style={{
                        backgroundColor: darkModeState ? '#333' : '#fff',
                    }}
                >
                    <img src="/images/loading.svg" alt="loading" />
                </div>
            ) : (
                <div
                    className="articlePage"
                    style={{
                        backgroundColor: darkModeState ? '#333' : '#fff',
                        width: 'calc(100% - 2rem)',
                        padding: '1rem',
                        height: 'calc(100vh - 2rem)',
                        color: darkModeState ? '#fff' : '#000',
                    }}
                >
                    <a href="/">
                        <button
                            className="backBtn"
                            style={{
                                color: darkModeState ? '#444' : '#fff',
                            }}
                        >
                            ←
                        </button>
                    </a>

                    <div className="acticleDetail">
                        <div style={{ padding: '10px', textAlign: created == 'loading' ? 'center' : 'right' }}>
                            {created}
                        </div>
                        <div style={{ padding: '10px', textAlign: 'center' }}>{title}</div>

                        <div className="contentDiv">{ReactHtmlParser(content)}</div>
                    </div>

                    <div className="btnDiv">
                        <button
                            style={{
                                color: darkModeState ? '#444' : '#fff',
                            }}
                            className="editBtn"
                            onClick={onEditClick}
                        >
                            수정
                        </button>

                        <button
                            style={{
                                color: darkModeState ? '#444' : '#fff',
                            }}
                            className="deleteBtn"
                            onClick={onDeleteClick}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ArticlePage;
