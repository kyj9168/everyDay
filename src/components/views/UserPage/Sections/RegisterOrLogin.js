import React, { useRef } from 'react';
import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'slice/userSlice';
import { Link, useHistory } from 'react-router-dom';

function RegisterOrLogin() {
    const dispatch = useDispatch();
    const joinPwd = useRef();
    const idInput = useRef();
    const pwdInput = useRef();
    const history = useHistory();

    const sendLoginInfo = () => {
        let user = {
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
    const { id, status } = useSelector((state) => ({
        id: state.userReducers.id,
        status: state.userReducers.status,
    }));


    const inJoinUserPage = () => {
        const path = `/joinUser`;
        history.push(path);
    };
    const inEditUserPage = () => {
        const path = `/editUser`;
        history.push(path);
    };
    const inLeaveUserPage = () => {
        const path = `/LeaveUser`;
        history.push(path);
    };
    return (
        <div style={{ width: '80%', margin: '0rem auto' }}>
            <br />
            <div style={{ width: '80%', margin: '2rem auto' }}>
                <label>group id </label>
                <Input ref={idInput} onKeyPress={enterKey} type="text" name="id" />
                <label>pwd </label>
                <Input ref={pwdInput} onKeyPress={enterKey} type="password" name="pwd" />
            </div>
            <p className="userModal" style={{ textAlign: 'center', display: status === 'fail' ? '' : 'none' }}>
                계정을 찾지 못햇습니다. 아이디 및 비밀번호를 확인해 주세요.
            </p>
            <div style={{ margin: '0 auto 0 auto', width: 'fit-content' }}>
                <Button type="primary" onClick={sendLoginInfo}>
                    login
                </Button>
                <Button type="primary"onClick={inJoinUserPage} style={{ marginLeft: '15px' }}>
                    join
                </Button>
                <Button type="primary" onClick={inEditUserPage}  style={{ marginLeft: '15px' }}>
                    edit
                </Button>
                <Button type="primary" onClick={inLeaveUserPage}  style={{ marginLeft: '15px' }}>
                    leave
                </Button>
            </div>
        </div>
    );
}

export default RegisterOrLogin;
