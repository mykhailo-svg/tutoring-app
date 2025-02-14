import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getData(): Promise<string | undefined> {
    await this.cacheManager.set('key', 'value');

    const value = await this.cacheManager.get<string>('key'); // ? Retrieve data from the cache

    console.log(value);

    return value;
  }
}
