import React, { useRef } from 'react';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { userActions } from 'slice/userSlice';

function RegisterOrLogin() {
    const dispatch = useDispatch();

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
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <br />
            <div style={{ width: '80%', margin: '2rem auto' }}>
                <label>id: </label>
                <Input ref={idInput} type="text" name="id" />
                <label>pwd: </label>
                <Input ref={pwdInput} type="password" name="pwd" />
            </div>
            <Button type="primary" onClick={sendLoginInfo}>
                Login
            </Button>
        </div>
    );
}

export default RegisterOrLogin;
