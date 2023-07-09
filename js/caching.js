module.exports = function createRedisClient() {
    const redis = require('redis');
    
    const redis_client = redis.createClient({
        legacyMode: true,
    host: 'ssibal.kyhsrb.clustercfg.apn2.cache.amazonaws.com',
    port: '6379',
    });
    
    redis_client.connect().then();
    
    redis_client.on('connect', () => {
    console.log('Connected to Redis');
    });
    
    redis_client.on('error', (err) => {
    console.error('Redis Error:', err);
    });
    
    return redis_client;
    };