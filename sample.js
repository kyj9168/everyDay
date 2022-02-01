const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const approot = require('app-root-path');
const esService = require(`${approot}/server/utils/elasticsearch.service.js`);
const indexName = 'rb_board';
const docType = '_doc';
async function main() {
    for (let i = 1; i <= 12; i++) {
        const rand_1_20 = Math.floor(Math.random() * 20) + 1;
        for (let j = 1; j <= rand_1_20; j++) {
            let payload = {
                title: 'sample' + j + i,
                content: 'sample' + j + i,
                userId: 'test',
                created: moment()
                    .add({ days: '-' + j, months: '-' + i, hour: i + j })
                    .format('YYYY-MM-DD'),
                group: moment()
                    .add({ days: '-' + j, months: '-' + i, hour: i + j })
                    .format('YYYY년 MM월'),
                time: moment()
                    .add({ days: '-' + j, months: '-' + i, hour: i + j })
                    .format('HH:mm:ss'),
                day: moment()
                    .add({ days: '-' + j, months: '-' + i, hour: i + j })
                    .format('DD'),
                modified: moment().format('YYYY-MM-DD HH:mm:ss'),
            };
            try {
                // addDocument: (indexName, _id, docType, payload) =
                const result = await esService.addDocument(indexName, uuidv4(), docType, payload);

                console.log('result::::', result.result);
            } catch (err) {
                throw err;
            }
        }
    }
}
main();
