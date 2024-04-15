import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisClientOptions } from 'redis';

/**
 * Important Note
 *
 * Due To Redis 4.0, cache-manager-redis-store is replaced with cache-manager-redis-yet
 * because compatibility issues.
 */
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
// import { CacheInterceptor } from '@nestjs/cache-manager';
// import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,

    /** For Global Cache Interceptor (IDK why this is not working with redis)*/

    // {
    //   provide: APP_INTERCEPTOR,
    //   useValue: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
