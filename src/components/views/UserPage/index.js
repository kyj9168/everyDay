import React, { useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import { Button, Input } from 'antd';
import { userActions } from 'slice/userSlice';
import { modalActions } from 'slice/modalSlice';
import { activeActions } from 'slice/activeSlice';
import { Link, useHistory } from 'react-router-dom';
import DarkModeToggle from 'react-dark-mode-toggle';
import './style.scss';
function UserPage(props) {
    const dispatch = useDispatch();

    const idInput = useRef();
    const pwdInput = useRef();

    const joinId = useRef();
    const joinPwd = useRef();
    const joinPwdCheck = useRef();

    const history = useHistory();

    const sendLoginInfo = () => {
        const user = {
            id: idInput.current.value,
            pwd: pwdInput.current.value,
        };

        if (!user.id) {
            alert('아이디를 입력하십시오.');
            return false;
        }
        if (!user.pwd) {
            alert('비밀번호 입력하십시오.');
            return false;
        }
        dispatch(userActions.loginUser(user));
    };
    const enterKey = (event) => {
        if (event.key == 'Enter') {
            sendLoginInfo();
        }
    };

    const joinEnterKey = (event) => {
        if (event.key == 'Enter') {
            sendJoinInfo();
        }
    };

    const { id, status } = useSelector((state) => ({
        id: state.userReducers.id,
        status: state.userReducers.status,
    }));
    const { joinModalState } = useSelector((state) => ({
        joinModalState: state.modalReducers.joinModalState,
    }));

    const sendJoinInfo = () => {
        const joinUser = {
            id: joinId.current.value,
            pwd: joinPwd.current.value,
            pwdCheck: joinPwdCheck.current.value,
        };
        if (joinUser.pwd != joinUser.pwdCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
        if (!joinUser.id) {
            alert('아이디를 입력하십시오.');
            return false;
        } else if (joinUser.id.length < 7) {
            alert('아이디는 7자 이상으로 지어주세요.');
            return false;
        }
        if (!joinUser.pwd || !joinUser.pwdCheck) {
            alert('비밀번호 입력하십시오.');
            return false;
        } else if (joinUser.pwd.length < 7 || joinUser.pwdCheck.length < 7) {
            alert('비밀번호는 7자 이상으로 지어주세요.');
            return false;
        }
        dispatch(userActions.joinUser(joinUser));
        dispatch(modalActions.joinModalStateAsync(false));
    };
    const inJoinUserPage = () => {
        dispatch(modalActions.joinModalStateAsync(true));
    };
    const outJoinUserPage = () => {
        dispatch(modalActions.joinModalStateAsync(false));
    };
    const inEditUserPage = () => {
        // const path = `/editUser`;
        // history.push(path);
    };
    const inLeaveUserPage = () => {
        // const path = `/LeaveUser`;
        // history.push(path);
    };

    const { darkModeState } = useSelector((state) => ({
        darkModeState: state.activeReducers.darkModeState,
    }));

    const toggleDarkMode = () => {
        dispatch(activeActions.darkModeStateAsync());
    };
    return (
        <div
            className="userPageDiv"
            style={{
                backgroundColor: darkModeState ? '#333' : '#fff',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <img
                    src={darkModeState ? '/images/logo_dark.png' : '/images/logo.png'}
                    alt="logo"
                    style={{ textAlign: 'center', marginBottom: '5vmin', width: '40vh' }}
                />
            </div>
            <DarkModeToggle
                className="darkMode"
                speed={2}
                onChange={toggleDarkMode}
                checked={darkModeState}
                size={60}
            />

            <div
                className="loginDiv"
                style={{
                    backgroundColor: darkModeState ? '#444' : '#fff',
                }}
            >
                <input
                    maxLength="20"
                    placeholder="아이디를 입력하세요."
                    ref={idInput}
                    onKeyPress={enterKey}
                    type="text"
                    name="id"
                    style={{
                        color: darkModeState ? '#fff' : '#000',
                        backgroundColor: darkModeState ? '#444' : '#fff',
                    }}
                />

                <input
                    placeholder="비밀번호를 입력하세요."
                    ref={pwdInput}
                    onKeyPress={enterKey}
                    type="password"
                    name="pwd"
                    maxLength="20"
                    style={{
                        color: darkModeState ? '#fff' : '#000',
                        backgroundColor: darkModeState ? '#444' : '#fff',
                    }}
                />
                <p
                    className="userModal"
                    style={{ textAlign: 'center', color: 'red', display: status === 'fail' ? '' : 'none' }}
                >
                    계정을 찾지 못햇습니다. 아이디 및 비밀번호를 확인해 주세요.
                </p>
                <div>
                    <button
                        onClick={sendLoginInfo}
                        style={{
                            color: darkModeState ? '#444' : '#fff',
                        }}
                    >
                        기록하러 가기
                    </button>
                    <button
                        onClick={inJoinUserPage}
                        style={{
                            color: darkModeState ? '#444' : '#fff',
                        }}
                    >
                        가입
                    </button>
                </div>
            </div>

            <div
                className="joinModal"
                style={{
                    backgroundColor: darkModeState ? '#767676b7' : '#bdbdbdb7',
                    display: joinModalState ? 'flex' : 'none',
                }}
            >
                <div
                    className="joinModalDiv"
                    style={{
                        backgroundColor: darkModeState ? '#444' : '#fff',
                        color: darkModeState ? '#FFF' : '#000',
                    }}
                >
                    <p>아이디 및 비밀번호를 입력하세요. </p>
                    <input
                        style={{
                            color: darkModeState ? '#444' : '#fff',
                        }}
                        className="closeBtn"
                        type="text"
                        value="✕"
                        onClick={outJoinUserPage}
                    />
                    <label>아이디 </label>
                    <input
                        placeholder="아이디를 입력하세요."
                        ref={joinId}
                        onKeyPress={joinEnterKey}
                        type="text"
                        name="joinId"
                        maxLength="20"
                        style={{
                            color: darkModeState ? '#fff' : '#000',
                            backgroundColor: darkModeState ? '#444' : '#fff',
                        }}
                        // onKeyUp={(this.value = this.value.replace(/[^a-zA-Z-_0-9]/g, ''))}
                    />
                    <label>비밀번호 </label>
                    <input
                        placeholder="비밀번호를 입력하세요."
                        ref={joinPwd}
                        onKeyPress={joinEnterKey}
                        type="password"
                        name="joinPwd"
                        maxLength="20"
                        style={{
                            color: darkModeState ? '#fff' : '#000',
                            backgroundColor: darkModeState ? '#444' : '#fff',
                        }}
                    />
                    <label>비밀번호 확인</label>
                    <input
                        placeholder="비밀번호를 한번 더 입력하세요."
                        ref={joinPwdCheck}
                        onKeyPress={joinEnterKey}
                        type="password"
                        name="joinPwdCheck"
                        maxLength="20"
                        style={{
                            color: darkModeState ? '#fff' : '#000',
                            backgroundColor: darkModeState ? '#444' : '#fff',
                        }}
                    />
                    <button
                        style={{
                            color: darkModeState ? '#444' : '#fff',
                        }}
                        className="joinBtn"
                        onClick={sendJoinInfo}
                    >
                        일상 기록하러 가기
                    </button>
                </div>
            </div>
            <div style={{ margin: '0 auto 0 auto', width: 'fit-content' }}>
                {/* <Button type="primary" onClick={inEditUserPage} style={{ marginLeft: '15px' }}>
                        edit
                    </Button>
                    <Button type="primary" onClick={inLeaveUserPage} style={{ marginLeft: '15px' }}>
                        leave
                    </Button> */}
            </div>

            {/* <div style={{ display: check !=='join'? 'none' : '' }}>회원가입완료</div>
            <div style={{ display: check ? 'none' : '' }}>비밀번호를 확인해 주세요</div> */}
        </div>
    );
}

export default UserPage;
