const approot = require('app-root-path');
const esService = require(`${approot}/server/utils/elasticsearch.service.js`);
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

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
            _source: ['title', 'day', 'group', 'modified'],
            sort: [
                {
                    group: {
                        order: 'desc',
                    },
                },
                {
                    day: {
                        order: 'asc',
                    },
                },
                {
                    time: {
                        order: 'asc',
                    },
                },
            ],
            size: 10000,
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
    setBoard: async (title, content, userId) => {
        payload = {
            title: title,
            content: content,
            userId: userId,
            created: moment().format('YYYY-MM-DD'),
            group: moment().format('YYYY년 MM월'),
            day: moment().format('DD'),
            time: moment().format('HH:mm:ss'),
            modified: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        try {
            // addDocument: (indexName, _id, docType, payload) =
            const result = await esService.addDocument(indexName, uuidv4(), docType, payload);
            return result;
        } catch (err) {
            throw err;
        }
    },
    editBoard: async (boardId, title, content, userId) => {
        payload = {
            doc: {
                title: title,
                content: content,
                modified: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
        };
        console.log(111, boardId, title, userId);
        try {
            // addDocument: (indexName, _id, docType, payload) =indexName, _id, docType, payload)
            const result = await esService.update(indexName, boardId, docType, payload);
            return result;
        } catch (err) {
            throw err;
        }
    },
    deleteBoard: async (boardId, userId) => {
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
            // addDocument: (indexName, _id, docType, payload) =
            const result = await esService.deleteByQuery(indexName, payload);
            return result;
        } catch (err) {
            throw err;
        }
    },
};
