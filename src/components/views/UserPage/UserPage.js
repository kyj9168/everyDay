import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import LoginForm from './Sections/LoginForm';
import { Button, Typography } from 'antd';
import './style.css';
const { Title } = Typography;
function UserPage(props) {
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <img src="/images/logo.png" alt="logo" style={{ marginTop: '50px', width: '300px' }} />
                {/* <Title>로그인</Title> */}
            </div>

            <LoginForm />

            {/* <div style={{ display: check !=='join'? 'none' : '' }}>회원가입완료</div>
            <div style={{ display: check ? 'none' : '' }}>비밀번호를 확인해 주세요</div> */}
        </>
    );
}

export default UserPage;
