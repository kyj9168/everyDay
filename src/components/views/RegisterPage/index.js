import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Button, Input } from 'antd';
import JoditEditor from 'jodit-react';
import { boardActions } from '../../../slice/boardSlice';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';

// const { TextArea } = Input;
function RegisterPage(props) {
    const dispatch = useDispatch();
    const titleInput = useRef();
    const [startDate, setStartDate] = useState(new Date());
    const [sendPossibile, setSendPossibile] = useState(true);

    const editor = useRef(null);
    const [loading, setLoading] = useState(false);
    const sendRegister = (event) => {
        const register = {
            title: titleInput.current.value,
            content: editor.current.value,
            created: startDate,
        };
        console.log('startDate:::', startDate);
        if (!register.title) {
            alert('제목을 입력하십시오.');
            return false;
        }
        if (!register.content) {
            alert('내용을 입력하십시오.');
            return false;
        }
        if (!sendPossibile) {
            alert('이미지는 3장까지만 등록 가능합니다. 기준을 맞춰주세요. 😓');
            return false;
        }
        // console.log('등록할 게시글:::', register);
        setLoading(true);
        dispatch(boardActions.setBoard(register));
    };
    const { darkModeState } = useSelector((state) => ({
        darkModeState: state.activeReducers.darkModeState,
    }));

    return (
        <>
            <div
                className="loading"
                style={{
                    backgroundColor: darkModeState ? '#00000080' : '#ffffff80',
                    display: loading ? 'block' : 'none',
                }}
            >
                <img src="/images/loading.svg" />
            </div>
            <div
                style={{
                    backgroundColor: darkModeState ? '#333' : '#fff',
                    width: 'calc(100% - 2rem)',
                    padding: '1rem',
                    height: 'calc(100vh - 2rem)',
                    color: darkModeState ? '#fff' : '#000',
                }}
            >
                <a href="/">
                    <button
                        style={{
                            color: darkModeState ? '#444' : '#fff',
                        }}
                        className="backBtn"
                    >
                        ←
                    </button>
                </a>
                <br />
                <div style={{ width: '100%', margin: '1rem auto' }}>
                    <label>제목 : </label>
                    <input
                        placeholder="제목을 입력하세요."
                        style={{
                            backgroundColor: darkModeState ? '#333' : '#fff',
                            color: darkModeState ? '#fff' : '#000',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            padding: '5px',
                            width: 'calc(100% - 20px)',
                            maxWidth: '400px',
                        }}
                        ref={titleInput}
                        type="text"
                        name="title"
                    />
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        className="dateDiv"
                        selected={startDate}
                        maxDate={new Date()}
                        locale={ko}
                        onChange={(date) => setStartDate(date)}
                    />
                    <hr />
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
                        onChange={(newContent) => {
                            const imageCount = newContent.match(/data:image/g);
                            if (imageCount?.length > 3) {
                                alert('이미지는 3장까지만 등록 가능합니다. 기준을 맞춰주세요. 😓');

                                setSendPossibile(false);
                            } else if (!sendPossibile) {
                                console.log("asdf")
                                setSendPossibile(true);
                            }
                        }}
                        // value={content}
                        // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    />

                    {/* <TextArea ref={contextInput} rows="30" name="content" /> */}
                </div>
                <button
                    style={{
                        color: darkModeState ? '#444' : '#fff',
                    }}
                    className="sendBoardInfoBtn"
                    onClick={sendRegister}
                >
                    등록
                </button>
            </div>
        </>
    );
}

export default RegisterPage;
