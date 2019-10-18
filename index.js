const crypto = require('crypto');
const Queue = require('bull');
const REDIS_URL = process.env.REDIS_URL;

const txInQueue = new Queue('tx-in-queue', REDIS_URL);
const txOutQueue = new Queue('tx-out-queue', REDIS_URL);

const sha3 = (obj) => {
  const stringifiedObj = JSON.stringify(obj);

  const secret = 'abcdefg';
  const hash = crypto
    .createHmac('sha256', secret)
    .update(stringifiedObj)
    .digest('hex');

  return `0x${hash}`;
}

const  delay = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const repeat = (n, cb) => {
  [...Array(n)].forEach(cb);
}

txInQueue.process(
  async (job, done) => {
    await delay(5000);
    job.progress(38);
    const txHash = sha3(job.data);
    job.progress(87);
    txOutQueue.add({ txHash });
    done();
  },
);

const main = async () => {
  repeat(100, () => {
    txInQueue.add({ data: new Date().toISOString() });
  });
}

main();
