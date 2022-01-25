import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function BoardList(props) {
    return (
        <div>
            <table style={{ width: '100%' }}>
                <colgroup>
                    <col width="10%" />
                    <col width="70%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <th></th>
                    </tr>
                </tbody>
                <tbody>
                    {props.board.map((article) => {
                        console.log('article:::', article);
                        return (
                            <tr key={article.id}>
                                {/* <td>{board.id}</td> */}

                                <td onClick={() => props.handleArticleTitleClick(article.id)}>
                                    {article.title}
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
