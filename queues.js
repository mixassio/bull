const Queue = require('bull');
const REDIS_URL = process.env.REDIS_URL;

const delay = async(ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const txInQueue = new Queue('tx-in-queue', REDIS_URL);
txInQueue.process(
    async(job, done) => {
        await delay(5000);
        job.progress(38);
        txOutQueue.add({ one: job.data });
        done();
    },
);

const txOutQueue = new Queue('tx-out-queue', REDIS_URL);
txOutQueue.process(
    async(job, done) => {
        await delay(3000);
        job.progress(20);
        txEndQueue.add({ one: job.data, second: 'done' });
        job.progress(25);
        done();
    },
);

const txEndQueue = new Queue('tx-end-queue', REDIS_URL);

module.exports = {
    txInQueue,
    txOutQueue,
    txEndQueue
};