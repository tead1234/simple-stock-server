const Redis = require('ioredis');

function createRedisClient() {
    const redis = new Redis({
    host: '3.38.104.200'
});


    return redis;
}
module.exports = createRedisClient;
