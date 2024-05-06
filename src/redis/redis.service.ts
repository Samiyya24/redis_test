import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { SetRedisDto } from './dto/set-redis.dto';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';
// import { UpdateRediDto } from './dto/update-redi.dto';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
  ) {}

  onModuleDestroy() {
    this.redisClient.quit();
  }

  ping() {
    return this.redisClient.ping();
  }

  async set(setRedisDto: SetRedisDto): Promise<string> {
    const { key, value } = setRedisDto;
    const keyExists = await this.redisClient.exists(key)
    console.log(keyExists);
    
    await this.redisClient.set(key, value, {EX:100});

    return `Set value from Redis: ${value}`;
  }

  async get(key: string): Promise<string> {
    console.log(await this.redisClient.keys('*'));
    
    const retrievedValue = await this.redisClient.get(key);
    // const retrievedValue = await this.redisClient.getDel(key);
     await this.redisClient.del(key);

    return `Get value from Redis: ${retrievedValue}`;
  }
}
