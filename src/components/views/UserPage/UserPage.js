import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import RegisterOrLogin from './Sections/RegisterOrLogin';
import { Button, Typography } from 'antd';

const { Title } = Typography;
function UserPage(props) {
    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title>로그인</Title>
            </div>
            <RegisterOrLogin />
            {/* <div style={{ display: check !=='join'? 'none' : '' }}>회원가입완료</div>
            <div style={{ display: check ? 'none' : '' }}>비밀번호를 확인해 주세요</div> */}
        </>
    );
}

export default UserPage;
