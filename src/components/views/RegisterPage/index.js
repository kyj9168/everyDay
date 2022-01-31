import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Button, Input } from 'antd';
import JoditEditor from 'jodit-react';
import { boardActions } from '../../../slice/boardSlice';
import './style.scss';

// const { TextArea } = Input;
function RegisterPage(props) {
    const dispatch = useDispatch();
    const titleInput = useRef();

    const editor = useRef(null);
    const [loading, setLoading] = useState(false);
    const sendRegister = (event) => {
        const register = {
            title: titleInput.current.value,
            content: editor.current.value,
        };

        if (!register.title) {
            alert('제목을 입력하십시오.');
            return false;
        }
        if (!register.content) {
            alert('내용을 입력하십시오.');
            return false;
        }
        // console.log('등록할 게시글:::', register);
        setLoading(true);
        dispatch(boardActions.setBoard(register));
    };

    return (
        <>
            <div
                className="loading"
                style={{
                    display: loading ? 'block' : 'none',
                }}
            >
                <img src="/images/loading.svg" />
            </div>
            <div style={{ width: 'calc(100% - 30px)', margin: '1rem auto' }}>
                <a href="/">
                    <button className="backBtn">←</button>
                </a>
                <br />
                <div style={{ width: '100%', margin: '1rem auto' }}>
                    <label>제목 : </label>
                    <input
                        placeholder="제목을 입력하세요."
                        style={{
                            width: 'calc(100% - 20px)',
                            maxWidth: '400px',
                        }}
                        ref={titleInput}
                        type="text"
                        name="title"
                    />
                    <hr></hr>
                    <JoditEditor
                        ref={editor}
                        config={{
                            readonly: false,
                            uploader: {
                                insertImageAsBase64URI: true,
                            },
                            placeholder: '오늘 하루는 어떤 일이 있으셨어요?',
                        }}
                        tabIndex={1} // tabIndex of textarea
                        style={{ height: 'calc(100vh - 300px)' }}
                    />

                    {/* <TextArea ref={contextInput} rows="30" name="content" /> */}
                </div>
                <button className="sendBoardInfoBtn" onClick={sendRegister}>
                    등록
                </button>
            </div>
        </>
    );
}

export default RegisterPage;
