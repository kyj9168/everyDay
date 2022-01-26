/**
 * User Controller
 * 사용자 정보 컨트롤러
 * */

const approot = require('app-root-path');
const userModel = require(`${approot}/server/routes/model/user.model`);
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
                    result: 'fail',
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
