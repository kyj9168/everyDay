import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Masonry from 'react-masonry-css';
import FadeInSection from 'utils/fadeIn';
import moment from 'moment';
function BoardList(props) {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        800: 2,
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
                    <FadeInSection key={value[0]}>
                        <div className="group">{value[0]}</div>
                        {value[1].map((object) => {
                            return (
                                <div
                                    className="board"
                                    key={object.id}
                                    onClick={() => props.handleArticleTitleClick(object.id)}
                                >
                                    <div className="day">{object.day}</div>
                                    <div className="title" title={object.title}>
                                        <div
                                            style={{
                                                display:
                                                    moment(object.modified).format('YYYY-MM-DD HH:mm:ss') <
                                                    moment().add('-3', 'h').format('YYYY-MM-DD HH:mm:ss')
                                                        ? 'none'
                                                        : 'block',
                                            }}
                                        >
                                            new
                                        </div>
                                        {object.title}
                                    </div>
                                </div>
                            );
                        })}
                    </FadeInSection>
                );
            })}
        </Masonry>
    );
}

export default BoardList;
