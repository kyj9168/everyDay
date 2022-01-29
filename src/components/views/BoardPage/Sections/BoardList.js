import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Masonry from 'react-masonry-css';
function BoardList(props) {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };
    return (
        <Masonry
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            breakpointCols={breakpointColumnsObj}
        >
            {props.boardList.map((value) => {
                return (
                    <div key={value[0]}>
                        <div className="group">{value[0]}</div>
                        {value[1].map((object) => {
                            return (
                                <div className="board" onClick={() => props.handleArticleTitleClick(object.id)}>
                                    <div className="day" key={object.id}>
                                        {object.day}
                                    </div>
                                    <div className="title">{object.title}</div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </Masonry>
    );
}

export default BoardList;
