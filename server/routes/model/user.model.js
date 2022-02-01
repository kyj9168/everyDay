const approot = require('app-root-path');
const esService = require(`${approot}/server/utils/elasticsearch.service.js`);
const moment = require('moment');
const indexName = 'rb_user';
const docType = '_doc';
let payload = {};

module.exports = {
    login: async (userId, userPw) => {
        payload = {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                id: userId,
                            },
                        },
                        {
                            term: {
                                pwd: userPw,
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

    idCheck: async (userId) => {
        payload = {
            query: {
                term: {
                    id: userId,
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
    joinUser: async (userId, userPwd) => {
        payload = {
            id: userId,
            pwd: userPwd,
            created: moment().format('YYYY-MM-DD HH:mm:ss'),
            modified: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        try {
            // addDocument: (indexName, _id, docType, payload) =
            const result = await esService.addDocument(indexName, userId, docType, payload);
            return result;
        } catch (err) {
            throw err;
        }
    },
    leaveUser: async (userId, userPwd) => {
        payload = {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                id: {
                                    value: userId,
                                },
                            },
                        },
                        {
                            term: {
                                pwd: {
                                    value: userPwd,
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
    changePwd: async (userId, changePwd) => {
        payload = {
            doc: {
                pwd: changePwd,
                modified: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
        };
        try {
            const result = await esService.update(indexName, userId, docType, payload);
            return result;
        } catch (err) {
            throw err;
        }
    },
    // join: async (data) => {
    //     payload = {
    //         id: data.userId,
    //         pwd: data.userPw,
    //         name: data.userName,
    //         email: data.userEmail,
    //     };
    //     try {
    //         const result = await esService.addDocument(indexName, payload.id, docType, payload);

    //         return result;
    //     } catch (err) {
    //         throw err;
    //     }
    // },
    // reJoin: async (data) => {
    //     payload = {
    //         id: data.userId,
    //         pwd: data.userPw,
    //         name: data.userName,
    //         email: data.userEmail,
    //     };
    //     try {
    //         const result = await esService.addDocument(indexName, payload.id, docType, payload);

    //         return result;
    //     } catch (err) {
    //         throw err;
    //     }
    // },
    // findId: async (data) => {
    //     payload = {
    //         query: {
    //             bool: {
    //                 must: [
    //                     {
    //                         match: {
    //                             'name.keyword': data.userName,
    //                         },
    //                     },
    //                     {
    //                         match: {
    //                             'email.keyword': data.userEmail,
    //                         },
    //                     },
    //                 ],
    //             },
    //         },
    //     };
    //     try {
    //         const result = await esService.search(indexName, docType, payload);

    //         return result;
    //     } catch (err) {
    //         throw err;
    //     }
    // },
    // findPw: async (data) => {
    //     payload = {
    //         query: {
    //             bool: {
    //                 must: [
    //                     {
    //                         match: {
    //                             'id.keyword': data.userId,
    //                         },
    //                     },
    //                     {
    //                         match: {
    //                             'email.keyword': data.userEmail,
    //                         },
    //                     },
    //                 ],
    //             },
    //         },
    //     };
    //     try {
    //         const result = await esService.search(indexName, docType, payload);

    //         return result;
    //     } catch (err) {
    //         throw err;
    //     }
    // },
    // rePassword: async (data) => {
    //     payload = {
    //         id: data.userId,
    //         pwd: data.userPw,
    //         name: data.userName,
    //         email: data.userEmail,
    //     };
    //     try {
    //         const result = await esService.addDocument(indexName, payload.id, docType, payload);

    //         return result;
    //     } catch (err) {
    //         throw err;
    //     }
    // },
};
