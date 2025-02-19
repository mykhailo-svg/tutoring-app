import { User } from '@/global_types';

export enum REALTIME_UPDATES_EVENTS {
  USER_DISCONNECTED = 'USER_DISCONNECTED',
  USER_CONNECTED = 'USER_CONNECTED',
}

export type RealtimeUpdatesEventHandler<Payload = any> = (payload: {
  type: REALTIME_UPDATES_EVENTS;
  payload: {
    userId: User['id'];
  };
}) => void;

export type RealtimeUpdatesEventSubscriber = (
  event: REALTIME_UPDATES_EVENTS,
  handler: RealtimeUpdatesEventHandler,
  id: null | string
) => { id: string } | void;
export type RealtimeUpdatesEventSubscriptionRemover = (
  event: REALTIME_UPDATES_EVENTS,
  id: string
) => void;
