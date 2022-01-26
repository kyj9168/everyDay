import React from 'react';
import { Button, Input } from 'antd';

const { TextArea } = Input;

function RegisterForm(props) {
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <a href="/">
                <Button>←</Button>
            </a>
            <br />
            <div style={{ width: '80%', margin: '2rem auto' }}>
                <label>Title: </label>
                <Input value={props.titleValue} type="text" name="title" />
                <hr></hr>
                <TextArea rows="30" value={props.contentValue} name="content" />
            </div>
            <Button type="primary" onClick={props.handleSubmit}>
                 등록
            </Button>
        </div>
    );
}

export default RegisterForm;
