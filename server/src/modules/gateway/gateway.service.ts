import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@src/entities';
import { Cache } from 'cache-manager';

@Injectable()
export class GatewayService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async cacheOnlineUser(id: User['id']) {
    await this.cacheManager.set(`userIsOnline:${id}`, true);
  }

  async getIsUserOnline(id: User['id']) {
    const isOnline = await this.cacheManager.get(`userIsOnline:${id}`);

    return Boolean(isOnline);
  }
  async removeCachedOnlineUser(id: User['id']) {
    return this.cacheManager.del(`userIsOnline:${id}`);
  }
}
