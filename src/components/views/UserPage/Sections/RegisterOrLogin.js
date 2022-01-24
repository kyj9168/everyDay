import React from 'react';
import { Button, Input } from 'antd';

function RegisterOrLogin(props) {
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <form onSubmit={props.handleSubmit}>
                <br />
                <div style={{ width: '80%', margin: '2rem auto' }}>
                    <label>id: </label>
                    <Input onChange={props.handleRegisterChange} type="text" name="id" />
                    <label>pwd: </label>
                    <Input onChange={props.handleRegisterChange} type="password" name="pwd" />
                </div>
                <Button type="primary" onClick={props.handleSubmit}>
                    Login
                </Button>
            </form>
        </div>
    );
}

export default RegisterOrLogin;
