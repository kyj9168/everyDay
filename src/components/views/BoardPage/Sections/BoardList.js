import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function BoardList(props) {
    return (
        <div>
            <table style={{ width: '100%' }}>
               
                <tbody>
                    <tr>
                        <th>날짜</th>
                        <th>제목</th>
                    </tr>
                </tbody>
                <tbody>
                    {props.boardList.map((board) => {
                        console.log('board:::', board);
                        return (
                            <tr key={board.id} onClick={() => props.handleArticleTitleClick(board.id)}>
                                <td>{board.created}</td>

                                <td >
                                    {board.title}
                                    {/* &nbsp;
                                {props.commentLength[board.id] > 0 && `[${props.commentLength[board.id]}]`} */}
                                </td>

                                {/* <td>{board.content}</td> */}
                                {/* <td>
                                <Button onClick={() => props.handleDeleteClick(board.id)}>X</Button>
                            </td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default BoardList;
