import React, { useRef } from 'react';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { userActions } from 'slice/userSlice';

function RegisterOrLogin() {
    const dispatch = useDispatch();
    const joinPwd = useRef();
    const idInput = useRef();
    const pwdInput = useRef();

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
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <br />
            <div style={{ width: '80%', margin: '2rem auto' }}>
                <label>group id: </label>
                <Input ref={idInput} onKeyPress={enterKey} type="text" name="id" />
                <label>pwd: </label>
                <Input ref={pwdInput} onKeyPress={enterKey} type="password" name="pwd" />
            </div>
            <div style={{ margin: '0 auto 0 auto', width: '300px' }}>
                <Button type="primary" onClick={sendLoginInfo}>
                    login
                </Button>
                <Button type="primary" style={{ marginLeft: '15px' }}>
                    join
                </Button>
                <Button type="primary" style={{ marginLeft: '15px' }}>
                    edit
                </Button>
                <Button type="primary" style={{ marginLeft: '15px' }}>
                    leave
                </Button>
            </div>
        </div>
    );
}

export default RegisterOrLogin;
