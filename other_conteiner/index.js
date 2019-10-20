const Queue = require('bull');
const REDIS_URL = process.env.REDIS_URL;

const delay = async(ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const txOutQueue = new Queue('tx-out-queue', REDIS_URL);
const txEndQueue = new Queue('tx-end-queue', REDIS_URL);
txOutQueue.process(
    async(job, done) => {
        await delay(10000);
        job.progress(20);
        txEndQueue.add({ one: job.data, second: 'from other conteiner' });
        job.progress(25);
        done();
    },
);