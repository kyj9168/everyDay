/**
 * User Controller
 * 사용자 정보 컨트롤러
 * */

const approot = require('app-root-path');
const configfile = require(`${approot}/config/config.json`);
const runmode = configfile.runmode;
const config = configfile[runmode];
const axios = require('axios');
const esService = require(`${approot}/server/utils/elasticsearch.service`);

// catch routing handler function error
const doAsync = (fn) => async (req, res, next) => await fn(req, res, next).catch(next);
const login = doAsync(async (req, res, next) => {
    let indexName = 'rb_user';
    let request = req.body;
    let id = request.id;
    let pwd = request.pwd;
    let joinData = request.joinData;
    let token = request.token;
    const docType = '_doc';
    let payload = {
        query: {
            bool: {
                must: [
                    {
                        term: {
                            id,
                        },
                    },
                    {
                        term: {
                            pwd,
                        },
                    },
                ],
            },
        },
    };
    let searchResult = {};
    let status = 'new';
    try {
        searchResult = await esService.search(indexName, docType, payload);
        let count = searchResult.hits.total.value;
        console.log('count:::', count);
        if (count == 1) {
            bool = true;
            status = 'old';
            console.log('token:::', token);
            console.log('id:::', id);
            payload = {
                script: {
                    lang: 'painless',
                    source: `ctx._source.token="${token}"`,
                },
            };
            await esService.update(indexName, id, docType, payload);
        } else if (count == 0) {
            id = 'none';
            status = 'error';
        }
    } catch (error) {
        console.log(error);
    }

    res.send({
        status,
        id,
        token,
    });
});
const userCheck = doAsync(async (req, res, next) => {
    let indexName = 'rb_user';
    let request = req.body;
    let id = request.id;
    let pwd = request.pwd;
    let joinData = request.joinData;
    let token = request.token;
    const docType = '_doc';
    let payload = {
        query: {
            bool: {
                must: [
                    {
                        term: {
                            id,
                        },
                    },
                ],
            },
        },
    };
    let searchResult = {};
    let bool = false;
    try {
        searchResult = await esService.search(indexName, docType, payload);
        let count = searchResult.hits.total.value;
        console.log(123, searchResult);
        if (count == 1) {
            bool = true;
        } else {
            bool = 'join';
            payload = {
                id,
                pwd,
                joinData,
                token,
            };
            console.log(234, payload);
            await esService.addDocument(indexName, id, docType, payload);
        }
    } catch (error) {
        console.log(error);
    }

    res.send(bool);
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
