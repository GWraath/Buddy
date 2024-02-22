const redis = require("redis"); // Require the redis package

const client = redis.createClient({
    host: process.env.REDIS_HOST || "127.0.0.1", // Redis server host
    port: process.env.REDIS_PORT || 6379,       // Redis server port
});