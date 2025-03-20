import redis, { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on('erro', (err)=>console.log('redis error'));

await redisClient.connect();

console.log('Redis connected');

export default redisClient;
