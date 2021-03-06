const Queue = require('bull');
const REDIS_URL = process.env.REDIS_URL;

const delay = async(ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const txInQueue = new Queue('tx-in-queue', REDIS_URL);
const txOutQueue = new Queue('tx-out-queue', REDIS_URL);
const txEndQueue = new Queue('tx-end-queue', REDIS_URL);

txInQueue.process(
    async(job, done) => {
        await delay(5000);
        job.progress(38);
        txOutQueue.add({ one: job.data });
        done();
    },
);

module.exports = {
    txInQueue,
    txOutQueue,
    txEndQueue
};