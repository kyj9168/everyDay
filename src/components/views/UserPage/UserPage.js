import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import RegisterOrLogin from './Sections/RegisterOrLogin';
import { Button, Typography } from 'antd';
import { userActions } from '../../../slice/userSlice';

const { Title } = Typography;
function UserPage(props) {
    const dispatch = useDispatch();
    let [user, setUser] = useState({
        id: '',
        pwd: '',
    });

    const onRegisterChange = (event) => {
        const { id, pwd } = event.target;
        // console.log(id, pwd, event.target.name);
        if (event.target.name == 'id') {
            setUser({ ...user, id: event.target.value });
        } else if (event.target.name == 'pwd') {
            setUser({ ...user, pwd: event.target.value });
        }
        // dispatch(userActions.changeRegisterInput({ id: id, pwd: pwd }));
    };

    const onSubmitArticle = (event) => {
        event.preventDefault();

        if (!user.id) {
            alert('아이디를 입력하십시오.');
            return false;
        }

        if (!user.pwd) {
            alert('비밀번호 입력하십시오.');
            return false;
        }

        dispatch(userActions.registerUser(user));
    };
    const { id, status, token, check } = useSelector((state) => ({
        id: state.userReducers.id,
        status: state.userReducers.status,
        token: state.userReducers.token,
        check: state.userReducers.check,
    }));
    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title>로그인</Title>
            </div>
            <RegisterOrLogin handleRegisterChange={onRegisterChange} handleSubmit={onSubmitArticle} />
            <div style={{ display: check !=='join'? 'none' : '' }}>회원가입완료</div>
            <div style={{ display: check ? 'none' : '' }}>비밀번호를 확인해 주세요</div>
        </>
    );
}

export default UserPage;
