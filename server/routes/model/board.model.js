const approot = require('app-root-path');
const esService = require(`${approot}/server/utils/elasticsearch.service.js`);
const indexName = 'rb_board';
const docType = '_doc';
let payload = {};

module.exports = {
    boardList: async (userId) => {
        payload = {
            query: {
                term: {
                    userId: {
                        value: userId,
                    },
                },
            },
        };
        try {
            const result = await esService.search(indexName, docType, payload);
            return result;
        } catch (err) {
            throw err;
        }
    },
    board: async (userId, boardId) => {
        payload = {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                _id: {
                                    value: boardId,
                                },
                            },
                        },
                        {
                            term: {
                                userId: {
                                    value: userId,
                                },
                            },
                        },
                    ],
                },
            },
        };
        try {
            const result = await esService.search(indexName, docType, payload);
            return result;
        } catch (err) {
            throw err;
        }
    },
};
