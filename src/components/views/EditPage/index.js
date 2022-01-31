import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Button, Input } from 'antd';
import JoditEditor from 'jodit-react';
import { boardActions } from 'slice/boardSlice';
import { articleActions } from 'slice/articleSlice';
import './style.scss';

// const { TextArea } = Input;
function RegisterPage({ match }) {
    const dispatch = useDispatch();
    const titleInput = useRef();
    const editor = useRef(null);

    const { id, title, content, created, modified } = useSelector((state) => ({
        id: state.articleReducers.id,
        title: state.articleReducers.title,
        content: state.articleReducers.content,
        created: state.articleReducers.created,
        modified: state.articleReducers.modified,
    }));

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(articleActions.getArticle(match.params.editId));
    }, [dispatch]);

    const sendRegister = (event) => {
        const register = {
            id: id,
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
        dispatch(boardActions.editBoard(register)); 
    };

    return (
        <>
            {content == 'loading' ? (
                <div className="loading">
                    <img src="/images/loading.svg" alt="loading" />
                </div>
            ) : (
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
                                // value={title}
                                defaultValue={title}
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
                                value={content}
                            />

                            {/* <TextArea ref={contextInput} rows="30" name="content" /> */}
                        </div>
                        <button className="sendBoardInfoBtn" onClick={sendRegister}>
                            수정
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default RegisterPage;
