import React, { useRef } from 'react';
import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'slice/userSlice';
import { modalActions } from 'slice/modalSlice';
import { Link, useHistory } from 'react-router-dom';

function LoginForm() {
    const dispatch = useDispatch();

    const idInput = useRef();
    const pwdInput = useRef();

    const joinId = useRef();
    const joinPwd = useRef();
    const joinPwdCheck = useRef();

    const history = useHistory();

    const sendLoginInfo = () => {
        const user = {
            id: idInput.current.state.value,
            pwd: pwdInput.current.state.value,
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
            id: joinId.current.state.value,
            pwd: joinPwd.current.state.value,
            pwdCheck: joinPwdCheck.current.state.value,
        };
        if (joinUser.pwd != joinUser.pwdCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
        if (!joinUser.id) {
            alert('아이디를 입력하십시오.');
            return false;
        }
        if (!joinUser.pwd||!joinUser.pwdCheck) {
            alert('비밀번호 입력하십시오.');
            return false;
        }
        dispatch(userActions.joinUser(joinUser));
        // dispatch(modalActions.joinModalStateAsync(true));
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
    return (
        <div style={{ width: '80%', margin: '0rem auto' }}>
            <br />
            <div style={{ width: '80%', margin: '2rem auto' }}>
                <label>id </label>
                <Input ref={idInput} onKeyPress={enterKey} type="text" name="id" />
                <label>pwd </label>
                <Input ref={pwdInput} onKeyPress={enterKey} type="password" name="pwd" />
            </div>
            <p className="userModal" style={{ textAlign: 'center', display: status === 'fail' ? '' : 'none' }}>
                계정을 찾지 못햇습니다. 아이디 및 비밀번호를 확인해 주세요.
            </p>
            <div className="joinModal" style={{ display: joinModalState ? 'block' : 'none' }}>
                <p>아이디 및 비밀번호를 입력하세요. </p>
                <input type="button" value="닫기" onClick={outJoinUserPage} />
                <label>id </label>
                <Input ref={joinId}onKeyPress={joinEnterKey} type="text" name="joinId" />
                <label>pwd </label>
                <Input ref={joinPwd} onKeyPress={joinEnterKey} type="password" name="joinPwd" />
                <label>pwd check</label>
                <Input ref={joinPwdCheck} onKeyPress={joinEnterKey} type="password" name="joinPwdCheck" />
                <input type="button" value="회원가입" onClick={sendJoinInfo} />
            </div>
            <div style={{ margin: '0 auto 0 auto', width: 'fit-content' }}>
                <Button type="primary" onClick={sendLoginInfo}>
                    login
                </Button>
                <Button type="primary" onClick={inJoinUserPage} style={{ marginLeft: '15px' }}>
                    join
                </Button>
                <Button type="primary" onClick={inEditUserPage} style={{ marginLeft: '15px' }}>
                    edit
                </Button>
                <Button type="primary" onClick={inLeaveUserPage} style={{ marginLeft: '15px' }}>
                    leave
                </Button>
            </div>
        </div>
    );
}

export default LoginForm;
