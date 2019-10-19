const express = require('express');
const bodyParser = require('body-parser');
const { txInQueue, txOutQueue, txEndQueue } = require('./queues');

const app = express();

module.exports = handleFunc => {
    app
        .use(bodyParser.json({
            strict: false,
            limit: '20mb',
        }))
        .post('/', async(req, res) => {

            console.log('in app---->>>', req.body);
            txInQueue.add({ data: req.body });

            res.status(200).end();
        })
        .get('/', (req, res) => {
            res.end(`Version ${process.env.npm_package_version}`);
        })

    return app;
};