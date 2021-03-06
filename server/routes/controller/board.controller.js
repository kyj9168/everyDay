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
            // console.log('result::', result);
            let resultArr = [];
            for (let val of result) {
                val._source.id = val._id;
                resultArr.push(val._source);
            }

            const groupBy = (list, keyGetter) => {
                const map = new Map();
                list.forEach((item) => {
                    const key = keyGetter(item);
                    if (!map.has(key)) {
                        map.set(key, [item]);
                    } else {
                        map.get(key).push(item);
                    }
                });
                return map;
            };

            const resData = groupBy(resultArr, (group) => group.group);
            // console.log(resData);
            return res.send({
                status: 'success',
                data: [...resData],
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
        } catch (err) {
            throw err;
        }
    },

    setBoard: async (req, res, next) => {
        let session = req.session;
        const userId = session.user.id;
        try {
            const title = req.body.title;
            const content = req.body.content;
            const created = req.body.created;
            let result = await boardModel.setBoard(title, content, userId, created);
            console.log('result::::', result);
            if (result.result === 'created') {
                return res.send({
                    status: 'success',
                    data: session.user,
                });
            }
        } catch (err) {
            throw err;
        }
    },

    editBoard: async (req, res, next) => {
        let session = req.session;
        const userId = session.user.id;
        try {
            const boardId = req.body.id;
            const title = req.body.title;
            const content = req.body.content;
            const created = req.body.created;

            let result = await boardModel.editBoard(boardId, title, content, userId,created);
            console.log('result::::', result);
            if (result.result === 'updated') {
                return res.send({
                    status: 'success',
                    data: session.user,
                });
            }
        } catch (err) {
            throw err;
        }
    },
    deleteBoard: async (req, res, next) => {
        let session = req.session;
        const userId = session.user.id;
        try {
            const boardId = req.body.boardId;
            let result = await boardModel.deleteBoard(boardId, userId);
            console.log('result::::', result);
            if (result.deleted > 0) {
                return res.send({
                    status: 'success',
                    data: session.user,
                });
            } else {
                return res.send({
                    status: 'fail',
                });
            }
        } catch (err) {
            throw err;
        }
    },
};
