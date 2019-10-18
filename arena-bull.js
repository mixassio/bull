const Arena = require('bull-arena');
const redis = {
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null,
    connectTimeout: 180000
  };

const arena = Arena({
  queues: [
    {
      name: 'my_gueue',
      hostId: 'My Queue',
      redis,
    },
  ],
},
{
  basePath: '/',
  disableListen: true,
});

module.exports = { arena };
