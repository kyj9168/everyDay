const elasticsearch = require('elasticsearch');
const approot = require('app-root-path');
const configfile = require(`${approot}/config/config.json`);
const runmode = configfile.runmode;
const config = configfile[runmode];

let elasticClient;
let setElasticClient = () => {
    let elasticSet = config.ES_HOST;
    elasticClient = new elasticsearch.Client({
        hosts: elasticSet,
    });
};
setElasticClient();
// const elasticClient = new elasticsearch.Client({
//   host: `${config.ELASTICSEARCH_HOST[0].IP}:${config.ELASTICSEARCH_HOST[0].PORT}`
// });

module.exports = {
    ping: (req, res) => {
        elasticClient.ping(
            {
                requestTimeout: 30000,
            },
            (error) => {
                if (error) {
                    res.status(500);
                    return res.json({ status: false, msg: 'Elasticsearch cluster is down!' });
                }
                res.status(200);
                return res.json({ status: true, msg: 'Success! Elasticsearch cluster is up!' });
            }
        );
    },

    /** 1. Create index */
    initIndex: (req, res, indexName) =>
        elasticClient.indices
            .create({
                index: indexName,
            })
            .catch((err) => {
                console.log(err);
                throw err;
            }),

    /** 2. Check if index exists */
    indexExists: (req, res, indexName) =>
        elasticClient.indices
            .exists({
                index: indexName,
            })
            .catch((err) => {
                console.log(err);
                throw err;
            }),

    /** 3.  Preparing index and its mapping */
    initMapping: (req, res, indexName, docType, payload) =>
        elasticClient.indices
            .putMapping({
                index: indexName,
                type: docType,
                body: payload,
            })
            .catch((err) => {
                console.log(err);
                throw err;
            }),

    /** 4. Add/Update a document */
    addDocument: (indexName, _id, docType, payload) =>
        elasticClient
            .index({
                index: indexName,
                type: docType,
                id: _id,
                body: payload,
            })
            .catch((err) => {
                console.log(err);
                throw err;
            }),

    /** 5. Update a document */
    update: async (indexName, _id, docType, payload) =>
        elasticClient
            .update({
                index: indexName,
                type: docType,
                id: _id,
                body: payload,
            })
            .catch((err) => {
                console.log(err);
                throw err;
            }),

    /** 6. Search */
    search: async (indexName, docType, payload) =>
        elasticClient
            .search({
                index: indexName,
                type: docType,
                body: payload,
            })
            .catch((err) => {
                console.log(err);
                throw err;
            }),

    /** -----  DANGER AREA [RESTRICTED USE] ----- */

    // Delete a document from an index
    deleteDocument: (index, _id, docType) =>
        elasticClient
            .delete({
                index: index,
                type: docType,
                id: _id,
            })
            .catch((err) => {
                console.log(err);
                throw err;
            }),

    deleteByQuery: (index, query) =>
        elasticClient
            .deleteByQuery({
                index,
                body: query,
            })
            .catch((err) => {
                console.log(err);
                throw err;
            }),

    // Delete all
    deleteAll: (req, res) => {
        elasticClient.indices.delete(
            {
                index: '_all',
            },
            (err, resp) => {
                if (err) {
                    console.error(err.message);
                    return res.render('error', {
                        message: err.message,
                        error: err,
                    });
                }
                console.log('Indexes have been deleted!', resp);
                return res.json(resp);
            }
        );
    },

    /** -----  DANGER AREA [RESTRICTED USE] ----- */
};
