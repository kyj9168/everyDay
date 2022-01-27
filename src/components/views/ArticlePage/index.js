import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { articleActions } from '../../../slice/articleSlice';
import ArticleDetail from './Sections/ArticleDetail';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

const { Title } = Typography;
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

    // const [CommentValue, setCommentValue] = useState('');

    // const onCommentChange = (e) => {
    //     setCommentValue(e.currentTarget.value);
    // };

    // const onCommentSubmit = () => {
    //     if (CommentValue === '' || CommentValue === null || CommentValue === undefined) {
    //         alert('댓글을 입력하십시오.');
    //         return false;
    //     }
    //     const comment = {
    //         id: 0,
    //         content: CommentValue,
    //         date: Date.now(),
    //         articleId: id,
    //     };

    //     // dispatch(commentActions.registerComment(comment));
    // };

    // const onDeleteComment = (commentId) => {
    //     // dispatch(commentActions.deleteComment(commentId));
    // };

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div>
                <div style={{ margin: '2rem auto' }}>
                    <a href="/">
                        <Button type="primary">목록으로 가기</Button>
                    </a>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Title>게시글</Title>
                </div>
                <div>
                    <table>
                        <colgroup>
                            <col width="10%" />
                            <col width="40%" />
                            <col width="10%" />
                            <col width="40%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>날짜</th>
                                <td>{created}</td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td colSpan="3">{title}</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colSpan="3">{ReactHtmlParser(content)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ margin: '2rem auto' }}>
                    <Link to={`/edit/${id}?isForEdit=true`}>
                        <Button type="primary">수정</Button>
                    </Link>
                </div>
                <div style={{ margin: 'auto' }}>
                    <Button onClick={onDeleteClick}>삭제</Button>
                </div>
            </div>
        </div>
    );
}

export default ArticlePage;
