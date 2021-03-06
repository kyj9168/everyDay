/**
 * User Controller
 * 사용자 정보 컨트롤러
 * */

const approot = require('app-root-path');
const userModel = require(`${approot}/server/routes/model/user.model`);
const boardModel = require(`${approot}/server/routes/model/board.model`);
const crypto = require('crypto');

const password_crypto = (password) => {
    return crypto.createHash('sha512').update(password).digest('base64');
};
// catch routing handler function error
module.exports = {
    login: async (req, res, next) => {
        userInfo = req.body;
        let session = req.session;
        let userId = userInfo.userId;
        let userPwd = password_crypto(userInfo.userPwd);

        try {
            let result = await userModel.login(userId, userPwd);

            let count = result.hits.total.value;
            result = result.hits.hits;
            // console.log('result::', result);
            if (count == 0) {
                return res.send({
                    status: 'fail',
                    message: '계정을 찾을 수 없습니다.',
                });
            } else {
                req.session.user = {
                    id: result[0]._source.id,
                };
                console.log('세션정보 : : :', session);
                return res.send({
                    status: 'success',
                    data: session.user,
                });
            }
        } catch (err) {
            throw err;
        }
    },
    join: async (req, res, next) => {
        userInfo = req.body;
        let session = req.session;
        let userId = userInfo.userId;
        let userPwd = password_crypto(userInfo.userPwd);

        try {
            let result = await userModel.idCheck(userId);
            console.log(4444, result);
            let count = result.hits.total.value;
            let hits = result.hits.hits;
            // // console.log('result::', result);
            if (count == 0) {
                let result = await userModel.joinUser(userId, userPwd);
                console.log(12312, result);
                if (result.result === 'created') {
                    req.session.user = {
                        id: userId,
                    };
                    console.log('세션정보 : : :', session);
                    return res.send({
                        status: 'success',
                        data: session.user,
                    });
                }
            } else {
                return res.send({
                    status: 'fail',
                    message: '중복된 아이디 입니다.',
                });
            }
        } catch (err) {
            throw err;
        }
    },
    changePwd: async (req, res, next) => {
        const pwdData = req.body;
        let session = req.session;
        let userId = session.user.id;
        let userPwd = password_crypto(pwdData.userPwd);
        let changePwd = password_crypto(pwdData.changePwd);

        try {
            const checkResult = await userModel.login(userId, userPwd);
            console.log(4444, checkResult);
            let count = checkResult.hits.total.value;
            if (count > 0) {
                let result = await userModel.changePwd(userId, changePwd);
                console.log(333333, result);
                if (result.result === 'updated') {
                    req.session.destroy(); // 세션 삭제
                    res.clearCookie('sid'); // 세션 쿠키 삭제
                    return res.send({
                        status: 'success'
                    });
                }
            } else {
                return res.send({
                    status: 'fail',
                });
            }
            // let hits = result.hits.hits;
            // // // console.log('result::', result);
            // if (count == 0) {
            //     let result = await userModel.joinUser(userId, userPwd);
            //     console.log(12312, result);
            //     if (result.result === 'created') {
            //         req.session.user = {
            //             id: userId,
            //         };
            //         console.log('세션정보 : : :', session);
            //         return res.send({
            //             status: 'success',
            //             data: session.user,
            //         });
            //     }
            // } else {
            //     return res.send({
            //         status: 'fail',
            //         message: '중복된 아이디 입니다.',
            //     });
            // }
        } catch (err) {
            throw err;
        }
    },
    userCheck: async (req, res, next) => {
        try {
            let session = req.session;
            console.log('세션정보 : : :', req.session);
            if (session.user == undefined) {
                res.send({
                    status: 'fail',
                });
            } else {
                return res.send({
                    status: 'success',
                    data: req.session.user,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    logout: async (req, res, next) => {
        try {
            let session = req.session;
            console.log('세션정보 : : :', req.session);
            if (session.user == undefined) {
                res.send({
                    status: 'fail',
                });
            } else {
                req.session.destroy(); // 세션 삭제
                res.clearCookie('sid'); // 세션 쿠키 삭제
                return res.send({
                    status: 'success',
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    leaveUser: async (req, res, next) => {
        userInfo = req.body;
        let session = req.session;
        let userId = session.user.id;
        let userPwd = password_crypto(userInfo.userPwd);
        console.log(userId, userPwd);
        try {
            let result = await userModel.leaveUser(userId, userPwd);
            console.log(55555, result);
            let count = result.deleted;
            if (count == 1) {
                await boardModel.leaveSoDeleteBoard(userId);
                req.session.destroy(); // 세션 삭제
                res.clearCookie('sid'); // 세션 쿠키 삭제
                return res.send({
                    status: 'success',
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
    getIp: async (req, res, next) => {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        res.send(ip);
    },
};
// const autocomplete = doAsync(async (req, res, next) => {
//   const payload = req.body;

//   const teanaUrl = `http://${config.API_HOST}/api/yongin/autocomplete`;
//   const result = await axios
//     .post(teanaUrl, {
//       keyword: payload.speech,
//       label: payload.label,
//       middle: payload.middle,
//     })
//     .then(function (response) {
//       return response.data.result;
//     })
//     .catch(function (err) {
//       throw next(err);
//     });
//   // console.log('자동완성 결과:::', result);
//   res.send(result);
// });

// const quality = doAsync(async (req, res, next) => {
//   const result = await axios
//     .post(`http://${config.DM_HOST}/quality`, {
//       domain_id: config.DOMAIN_ID,
//       token: config.DM_TOKEN,
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       throw next(err);
//     });
//   res.send(result);
// });
