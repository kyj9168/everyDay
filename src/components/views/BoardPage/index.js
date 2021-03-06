import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BoardList from './Sections/BoardList';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from 'slice/boardSlice';
import { articleActions } from 'slice/articleSlice';
import { userActions } from 'slice/userSlice';
import { modalActions } from 'slice/modalSlice';
import { createSelector } from '@reduxjs/toolkit';
import './style.scss';

function BoardPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const leaveUserInput = useRef(null);
    const originalPwdInput = useRef(null);
    const pwdInput = useRef(null);
    const checkPwdInput = useRef(null);

    const [toggleUserDiv, setToggleUserDiv] = useState(false);
    useEffect(() => {
        dispatch(articleActions.initializationRegisterInput());
        dispatch(boardActions.loadingBoardAsync());
        dispatch(boardActions.getBoard());
    }, [dispatch]);

    const { board, isLoading, isSuccess, error } = useSelector((state) => ({
        board: state.boardReducers.board,
        isLoading: state.boardReducers.isLoading,
        isSuccess: state.boardReducers.isSuccess,
        error: state.boardReducers.error,
    }));

    const { changePwdState, leaveUserState } = useSelector((state) => ({
        changePwdState: state.modalReducers.changePwdState,
        leaveUserState: state.modalReducers.leaveUserState,
    }));

    const { id } = useSelector((state) => ({
        id: state.userReducers.id,
    }));

    const onDeleteClick = (id) => {
        if (!window.confirm('삭제하시겠습니까?')) return false;
        dispatch(articleActions.deleteArticle(id));
    };

    const onArticleTitleClick = (id) => {
        const path = `/article/${id}`;
        history.push(path);
        // dispatch(articleActions.getArticle(id));
    };
    const onNewPost = () => {
        const path = `/register`;
        history.push(path);
        // dispatch(articleActions.getArticle(id));
    };
    const onLogOut = () => {
        if (!window.confirm('로그아웃 하시겠습니까?')) return false;

        dispatch(userActions.logoutUser());
    };
    const toggleUserInfo = () => {
        // dispatch(userActions.logoutUser());
        setToggleUserDiv(!toggleUserDiv);
    };
    const leaveUserToggle = () => {
        setToggleUserDiv(!toggleUserDiv);
        dispatch(modalActions.leaveUserStateAsync(true));
    };
    const closeLeaveUserDiv = () => {
        dispatch(modalActions.leaveUserStateAsync(false));
        leaveUserInput.current.value = '';
    };
    const sendLeaveUser = () => {
        if (!window.confirm('탈퇴가 진행될시 모든 게시물이 삭제됩니다. 진행하시겠습니까?')) return false;
        const password = leaveUserInput.current.value;
        dispatch(userActions.leaveUser(password));
        dispatch(modalActions.leaveUserStateAsync(false));
        leaveUserInput.current.value = '';
    };

    const sendChangePwd = () => {
        if (!window.confirm('비밀번호 변경을 진행하시겠습니까?')) return false;
        const originalPwdInputValue = originalPwdInput.current.value;
        const pwdInputValue = pwdInput.current.value;
        const checkPwdInputValue = checkPwdInput.current.value;
        if (pwdInputValue != checkPwdInputValue) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }

        if (!originalPwdInputValue || !pwdInputValue || !checkPwdInputValue) {
            alert('비밀번호 입력하십시오.');
            return false;
        } else if (pwdInputValue.length < 7 || checkPwdInputValue.length < 7) {
            alert('비밀번호는 7자 이상으로 지어주세요.');
            return false;
        }
        if (originalPwdInputValue == pwdInputValue) {
            alert('변경하려는 비밀번호가 동일합니다.');
            return false;
        }
        const data = {
            originalPwdInputValue,
            pwdInputValue,
            checkPwdInputValue,
        };
        dispatch(userActions.changePwd(data));
        dispatch(modalActions.changePwdStateAsync(false));
        originalPwdInput.current.value = '';
        pwdInput.current.value = '';
        checkPwdInput.current.value = '';
    };
    const changePwdToggle = () => {
        setToggleUserDiv(!toggleUserDiv);
        dispatch(modalActions.changePwdStateAsync(true));
    };

    const closeChangePwdDiv = () => {
        dispatch(modalActions.changePwdStateAsync(false));
        originalPwdInput.current.value = '';
        pwdInput.current.value = '';
        checkPwdInput.current.value = '';
    };
    const { darkModeState } = useSelector((state) => ({
        darkModeState: state.activeReducers.darkModeState,
    }));
    return (
        <>
            <div
                style={{
                    backgroundColor: darkModeState ? '#333' : '#fff',
                    width: '100%',
                    height: '100%',
                    margin: '0 auto',
                    padding: '3rem 0',
                    minHeight: 'calc(100vh - 6rem)',
                }}
            >
                <button
                    style={{
                        color: darkModeState ? '#444' : '#fff',
                    }}
                    className="newPostBtn"
                    onClick={onNewPost}
                >
                    +
                </button>
                <button className="logoutBtn" onClick={toggleUserInfo}>
                    🧑🏻‍💻
                </button>
                <div
                    className="leaveUserDiv"
                    style={{
                        backgroundColor: darkModeState ? '#444' : '#fff',
                        color: darkModeState ? '#fff' : '#000',
                        display: leaveUserState ? 'inline-block' : 'none',
                    }}
                >
                    <label onClick={closeLeaveUserDiv}>✕</label>
                    <p>탈퇴하시려면 비밀번호를 입력해 주세요.</p>

                    <input
                        style={{
                            backgroundColor: darkModeState ? '#333' : '#fff',
                            color: darkModeState ? '#fff' : '#000',
                        }}
                        placeholder="현재 비밀번호를 입력하세요."
                        ref={leaveUserInput}
                        type="password"
                    />
                    <button
                        style={{
                            color: darkModeState ? '#444' : '#fff',
                        }}
                        onClick={sendLeaveUser}
                    >
                        탈퇴
                    </button>
                </div>
                <div
                    className="changePwdDiv"
                    style={{
                        backgroundColor: darkModeState ? '#444' : '#fff',
                        color: darkModeState ? '#fff' : '#000',
                        display: changePwdState ? 'inline-block' : 'none',
                    }}
                >
                    <label onClick={closeChangePwdDiv}>✕</label>
                    <p className="ment">비밀번호를 변경해 주세요.</p>
                    <p>현재 비밀번호</p>
                    <input
                        ref={originalPwdInput}
                        type="password"
                        placeholder="현재 비밀번호를 입력하세요."
                        style={{
                            backgroundColor: darkModeState ? '#333' : '#fff',
                            color: darkModeState ? '#fff' : '#000',
                        }}
                    />
                    <p>변경 비밀번호</p>
                    <input
                        style={{
                            backgroundColor: darkModeState ? '#333' : '#fff',
                            color: darkModeState ? '#fff' : '#000',
                        }}
                        ref={pwdInput}
                        type="password"
                        placeholder="변경할 비밀번호를 입력하세요."
                    />
                    <p>변경 비밀번호 확인</p>
                    <input
                        placeholder="변경할 비밀번호를 한번 더 입력하세요."
                        style={{
                            backgroundColor: darkModeState ? '#333' : '#fff',
                            color: darkModeState ? '#fff' : '#000',
                        }}
                        ref={checkPwdInput}
                        type="password"
                    />
                    <button
                        style={{
                            color: darkModeState ? '#444' : '#fff',
                        }}
                        onClick={sendChangePwd}
                    >
                        변경
                    </button>
                </div>
                <ul
                    className="userInfoDiv"
                    style={{
                        height: toggleUserDiv ? '89px' : '0px',
                    }}
                >
                    <li
                        style={{
                            backgroundColor: darkModeState ? '#555' : '#f0f0f0',
                            color: darkModeState ? '#fff' : '#000',
                        }}
                    >
                        <b>⌜{id}님⌟</b>
                    </li>
                    <li
                        style={{
                            backgroundColor: darkModeState ? '#555' : '#f0f0f0',
                            color: darkModeState ? '#fff' : '#000',
                        }}
                        onClick={onLogOut}
                    >
                        로그아웃
                    </li>
                    <li
                        style={{
                            backgroundColor: darkModeState ? '#555' : '#f0f0f0',
                            color: darkModeState ? '#fff' : '#000',
                        }}
                        onClick={changePwdToggle}
                    >
                        비밀번호 변경
                    </li>
                    <li
                        style={{
                            backgroundColor: darkModeState ? '#555' : '#f0f0f0',
                            color: darkModeState ? '#fff' : '#000',
                        }}
                        onClick={leaveUserToggle}
                    >
                        탈퇴
                    </li>
                </ul>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    {/* <Title>게시판</Title> */}
                    <img
                        style={{
                            width: '150px',
                        }}
                        src={darkModeState ? '/images/logo_dark.png' : '/images/logo.png'}
                        alt="logo"
                    />
                </div>
                {error ? (
                    <h2>에러 발생: {error}</h2>
                ) : isSuccess && board.length > 0 ? (
                    <BoardList
                        boardList={board}
                        // commentLength={commentLength}
                        handleDeleteClick={onDeleteClick}
                        handleArticleTitleClick={onArticleTitleClick}
                    />
                ) : isSuccess && board.length <= 0 ? (
                    <p
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        아직 일상을 기록 하지 않으셨네요. 위 + 버튼을 눌러 일상을 기록해 보세요.
                    </p>
                ) : (
                    <div
                        className="loadingBoard"
                        style={{
                            backgroundColor: darkModeState ? '#333' : '#fff',
                        }}
                    >
                        <img src="/images/loadingBoard.svg" alt="loading" />
                    </div>
                )}
            </div>
        </>
    );
}

export default BoardPage;
