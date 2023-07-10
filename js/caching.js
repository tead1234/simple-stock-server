const redis = require('redis');

function createRedisClient() {
    const redis_client = redis.createClient({
        host: 'localhost',
        port: '6379'
    });
    console.log("진입")
    redis_client.connect();
    redis_client.on('connect', () => {
        console.log('Connected to Redis');
        });
    redis_client.on('error', (err) => {
            console.error('Redis Error:', err);
            // 클라이언트가 오류 발생 시 자동으로 재연결하도록 처리
            redis_client.quit();
            redis_client.connect();
        });

    return redis_client;
}

module.exports = createRedisClient;
