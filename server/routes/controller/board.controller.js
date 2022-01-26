/**
 * User Controller
 * 사용자 정보 컨트롤러
 * */

const approot = require('app-root-path');
const boardModel = require(`${approot}/server/routes/model/board.model`);

module.exports = {
    boardList: async (req, res, next) => {
        let session = req.session;
        const userId = session.user.id;
        try {
            let result = await boardModel.boardList(userId);
            let count = result.hits.total.value;
            result = result.hits.hits;
            console.log('result::', result);
            let resultArr = [];
            for (let val of result) {
                val._source.id = val._id;
                resultArr.push(val._source);
            }

            return res.send({
                status: 'success',
                data: resultArr,
            });
        } catch (err) {
            throw err;
        }
    },

    board: async (req, res, next) => {
        let session = req.session;
        const userId = session.user.id;
        try {
            const boardId = req.body.boardId;
            let result = await boardModel.board(userId, boardId);

            let count = result.hits.total.value;
            result = result.hits.hits;

            if (count == 0) {
                return res.send({
                    result: 'success',
                    message: '게시물이 없습니다.',
                });
            } else {
                result[0]._source.id = result[0]._id;
                return res.send({
                    status: 'success',
                    data: result[0]._source,
                });
            }
            // console.log('result::', result);
            // let resultArr = [];
            // for (let val of result) {
            //     val._source.id = val._id;
            //     resultArr.push(val._source);
            // }
            // if (count == 0) {
            //     return res.send({
            //         result: 'success',
            //         message: '게시물이 없습니다.',
            //     });
            // } else {
            //     //     req.session.user = {
            //     //         id: result[0]._source.id,
            //     //     };
            //     //     console.log('세션정보 : : :', session);
            //     res.send({
            //         status: 'success',
            //         data: resultArr,
            //     });
            // }
        } catch (err) {
            throw err;
        }
    },
};
