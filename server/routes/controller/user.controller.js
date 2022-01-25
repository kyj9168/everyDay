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
const doAsync = (fn) => async (req, res, next) => await fn(req, res, next).catch(next);
const login = doAsync(async (req, res, next) => {
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
            // return res.send({
            //     result: 'fail',
            //     url: '/index',
            //     session: session,
            //     message: '계정을 찾을 수 없습니다.',
            // });
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
});
const userCheck = doAsync(async (req, res, next) => {
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
});
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

const getIp = doAsync(async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.send(ip);
});

module.exports = {
    login,
    userCheck,
    getIp,
};
