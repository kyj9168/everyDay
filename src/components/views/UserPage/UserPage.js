import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import RegisterOrLogin from './Sections/RegisterOrLogin';
import { Button, Typography } from 'antd';
import './style.css';
const { Title } = Typography;
function UserPage(props) {
    const { id, status } = useSelector((state) => ({
        id: state.userReducers.id,
        status: state.userReducers.status,
    }));
    console.log(55555, status);
    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <img src="/images/logo.png" alt="logo" style={{ width: '300px' }} />
                <Title>로그인</Title>
            </div>
            <RegisterOrLogin />
            <div className="userModal" style={{ display: status === 'fail' ? '' : 'none' }}>
                계정을 찾지 못햇습니다. 아이디 및 비밀번호를 확인해 주세요.
            </div>
            {/* <div style={{ display: check !=='join'? 'none' : '' }}>회원가입완료</div>
            <div style={{ display: check ? 'none' : '' }}>비밀번호를 확인해 주세요</div> */}
        </>
    );
}

export default UserPage;
