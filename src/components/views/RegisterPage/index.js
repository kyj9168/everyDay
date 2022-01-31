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
        dispatch(boardActions.setBoard(register));
    };

    return (
        <>
            <div style={{ width: 'calc(100% - 30px)', margin: '1rem auto' }}>
                <a href="/">
                    <button className="backBtn">←</button>
                </a>
                <br />
                <div style={{ width: '100%', margin: '1rem auto' }}>
                    <label>제목 : </label>
                    <input
                    placeholder='제목을 입력하세요.'
                        style={{
                            width: '100%',
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
                        // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        // onChange={(newContent) => {
                        //     debounce(setContent(newContent), 1000);
                        // }}
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

// query 나 프로퍼티에  edit/${id}/////?isEdit=true => (api 부분에서 true 이면)(edit이면) getArticleDetail(id) data, useEffect false는 data null, 아니면 set initialState
// 버튼도 isEdit 여부에 따라 바뀌어야 함
// onClick 이벤트도 다르게 넣어서 dispatch registerArticle editArticle 따로 타야 함

// 아니면 registerPage만 container처럼 만들어서 container에서 edit/register에 따라 props 다르게 넣어주면 되긴 함
// https://medium.com/@ghur2002/react-router%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-component%EA%B0%84%EC%97%90-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0-610de3511c67
// https://soldonii.tistory.com/115?category=862200
// https://soldonii.tistory.com/112?category=862200
// https://gongbu-ing.tistory.com/44

//  =>>>> container로 빼자! (react router 의 match, search 이용, qs parse Location 이용)

// 조회수는 reducer에서 처리
