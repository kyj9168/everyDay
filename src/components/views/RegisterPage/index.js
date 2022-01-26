import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import JoditEditor from 'jodit-react';
import { boardActions } from '../../../slice/boardSlice';
import './style.css';

const { TextArea } = Input;
function RegisterPage(props) {
    const dispatch = useDispatch();
    const titleInput = useRef();

    const editor = useRef(null);

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        uploader: {
            insertImageAsBase64URI: true,
        },
        enter: 'P',
        defaultMode: '1',
        // buttons: 'image',
        minHeight: 400,
    };
    // const config = {
    //     readonly: false,
    //     minHeight: 500,

    //     enter: "P",
    //     defaultMode: "1",
    //     buttons:
    //       "source |, bold, strikethrough, underline, italic, | ul, ol, outdent, indent, | font, fontsize, brush, | image, table |,align,undo,redo,\n,selectall,cut,copy,paste,eraser,copyformat,|,hr,symbol"
    //   };

    // const { id, created, modified, title, content } = useSelector(
    //     (state) => ({
    //         id: state.articleReducers.id,
    //         created: state.articleReducers.date,
    //         modified: state.articleReducers.editDate,
    //         title: state.articleReducers.title,
    //         content: state.articleReducers.content,
    //     }),
    //     shallowEqual
    // );

    // const [IsForUpdate, setIsForUpdate] = useState(false);

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(props.location.search);
    //     if (searchParams.get('isForEdit') === 'true') {
    //         dispatch(articleActions.fetchArticle(props.match.params.articleId));
    //         setIsForUpdate(true);
    //     }
    // }, []);

    // const onRegisterChange = (event) => {
    //     const { name, value } = event.target;
    //     dispatch(articleActions.changeRegisterInput({ name: name, value: value }));
    // };

    // const onSubmitArticle = (event) => {
    //     event.preventDefault();

    //     if (title === '' || title === null || title === undefined) {
    //         alert('제목을 작성하십시오.');
    //         return false;
    //     }

    //     if (content === '' || content === null || content === undefined) {
    //         alert('내용을 작성하십시오.');
    //         return false;
    //     }

    //     const article = {
    //         id: id, ///
    //         title: title,
    //         content: content,
    //         created: created,
    //         modified: modified,
    //     };

    //     // if (IsForUpdate) {
    //     //     dispatch(articleActions.updateArticle(article));
    //     // } else {
    //         dispatch(articleActions.registerArticle(article));
    //     // }
    // };
    const sendRegister = (event) => {
        const register = {
            title: titleInput.current.state.value,
            content: editor.current.value,
        };
        // console.log('등록할 게시글:::', register);
        dispatch(boardActions.setBoard(register));
    };

    return (
        <>
            <div style={{ width: '80%', margin: '3rem auto' }}>
                <a href="/">
                    <Button>←</Button>
                </a>
                <br />
                <div style={{ width: '80%', margin: '2rem auto' }}>
                    <label>Title: </label>
                    <Input ref={titleInput} type="text" name="title" />
                    <hr></hr>
                    <JoditEditor
                        ref={editor}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        // onChange={(newContent) => {
                        //     debounce(setContent(newContent), 1000);
                        // }}
                    />

                    {/* <TextArea ref={contextInput} rows="30" name="content" /> */}
                </div>
                <Button type="primary" onClick={sendRegister}>
                    등록
                </Button>
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
