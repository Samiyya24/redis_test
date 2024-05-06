import { FactoryProvider } from '@nestjs/common';
import { createClient } from 'redis';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';

export const redisClientFactory: FactoryProvider<Promise<RedisClient>> = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const client = createClient({
      url: 'redis://default:agO1KxkLeop1cX5JKy95id7dgSdUrcqQ@redis-10499.c250.eu-central-1-1.ec2.redns.redis-cloud.com:10499',
    });
    await client.connect();
    return client;
  },
};
